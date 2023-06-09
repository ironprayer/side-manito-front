import { getAccessTokenAnyway } from '@/auth/lib/jwt';
import Header from '@/common/components/Header';
import DetailHeader from '@/manito_group/components/Room/DetailHeader';
import OngoingGroupDetail from '@/manito_group/components/Room/OngoingGroupDetail';
import WaitingGroupDetail from '@/manito_group/components/Room/WaitingGroupDetail';
import useManitoGroupDetailQuery from '@/manito_group/hooks/query/useManitoGroupDetailQuery';
import { fetchGroupDetail } from '@/manito_group/lib/fetch';
import { GroupStatus, SerializedManitoGroup } from '@/manito_group/model';
import { USER_INFO_QUERY_KEY } from '@/user/constant/query_key';
import { fetchUserInfo } from '@/user/lib/fetch';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import detailStyles from '@/styles/groupDetail.module.css';
import EndedGroupDetail from '@/manito_group/components/Room/EndedGroupDetail';

const ManitoGroupPage: NextPage<{ initGroupData: SerializedManitoGroup }> = ({ initGroupData }) => {
  const router = useRouter();
  const { data } = useManitoGroupDetailQuery(Number(router.query.groupId), initGroupData);

  function mainContents() {
    if (!data) return <h1>그룹 정보를 가져오지 못했습니다. :(</h1>;

    let contents;
    switch (data.status) {
      case GroupStatus.WAITING:
        contents = <WaitingGroupDetail groupData={data} />;
        break;
      case GroupStatus.ONGOING:
        contents = <OngoingGroupDetail groupData={data} />;
        break;
      case GroupStatus.ENDED:
        contents = <EndedGroupDetail groupData={data} />;
        break;
      default:
        contents = <h1>error</h1>;
    }

    return (
      <main className={detailStyles.mainContainer}>
        <DetailHeader groupData={data} />
        <div className={detailStyles.contentsContainer}>{contents}</div>
      </main>
    );
  }

  return (
    <>
      <Head>
        <title>{`${data?.name} | Manito group page`}</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />
      {mainContents()}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res, query }) => {
  const accessToken = await getAccessTokenAnyway({ req, res });
  const groupId = Number(query.groupId);
  const groupDetail = await fetchGroupDetail(groupId, accessToken);
  if (!groupDetail) {
    return {
      notFound: true,
    };
  }

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery([USER_INFO_QUERY_KEY], () => fetchUserInfo(accessToken));
  return {
    props: {
      initGroupData: groupDetail,
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default ManitoGroupPage;
