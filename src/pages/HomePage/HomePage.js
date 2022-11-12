import { useSelector } from "react-redux";
import { Row, Button } from "antd";
import { RedoOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";

import { fetchNews } from "../../store/slices";
import PageLayout from "../../components/PageLayout";
import styles from "./HomePage.module.scss";
import NewsCard from "./NewsCard";

const HomePage = () => {
  const news = useSelector((state) => state.news.news);
  const dispatch = useDispatch();

  const onUpdateNews = () => {
    dispatch(fetchNews());
  };

  return (
    <PageLayout>
      <Button
        size="large"
        onClick={onUpdateNews}
        icon={<RedoOutlined />}
        className={styles.updateButton}
      >
        Update news
      </Button>
      <Row gutter={[16, 24]}>
        {news?.map((newsItem) => (
          <NewsCard newsItem={newsItem} key={newsItem.id} />
        ))}
      </Row>
    </PageLayout>
  );
};

export default HomePage;
