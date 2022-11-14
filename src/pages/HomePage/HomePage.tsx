import React from "react";
import { Row, Button } from "antd";
import { RedoOutlined } from "@ant-design/icons";

import {
  useAppDispatch as useDispatch,
  useAppSelector as useSelector,
} from "../../hooks";
import { fetchNews } from "../../store/slices";
import PageLayout from "../../components/PageLayout";
import styles from "./HomePage.module.scss";
import NewsCard from "./NewsCard";

import type { RootState } from "../../store";

const HomePage: React.FC = () => {
  const news = useSelector((state: RootState) => state.news.news);

  const isNewsLoading = useSelector((state) => state.news.isNewsLoading);

  const dispatch = useDispatch();

  const onUpdateNews = () => {
    dispatch(fetchNews());
  };

  return (
    <PageLayout>
      <Button
        size="large"
        onClick={onUpdateNews}
        loading={isNewsLoading}
        icon={<RedoOutlined />}
        className={styles.updateButton}
      >
        Update news
      </Button>
      <Row gutter={[16, 24]}>
        {news?.map((newsItem) => (
          <NewsCard newsItem={newsItem} key={newsItem?.id} />
        ))}
      </Row>
    </PageLayout>
  );
};

export default HomePage;
