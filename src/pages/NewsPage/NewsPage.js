import { useEffect } from "react";
import { PageHeader, Card, Descriptions } from "antd";
import { useParams, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import moment from "moment";
import { useDispatch } from "react-redux";

import PageLayout from "../../components/PageLayout";
import { fetchComments } from "../../store/slices";
import CommentList from "./CommentList";

const NewsPage = () => {
  const { id } = useParams();
  const currentNews = useSelector(
    (state) => state.news.news.filter((newsItem) => newsItem.id === +id)[0]
  );
  const comments = useSelector((state) => state.news.comments);

  const dispatch = useDispatch();

  let history = useHistory();
  console.log("comments", currentNews);
  const date = moment(currentNews?.time * 1000).format("MMM Do YY");

  useEffect(() => {
    dispatch(fetchComments(id));
  }, [dispatch, id]);

  return (
    <PageLayout>
      <Card
        title={
          <PageHeader
            onBack={() => history.push("/")}
            title={currentNews?.title}
            subTitle={date === "Invalid date" ? "" : date}
          />
        }
      >
        <Descriptions size="small" column={1}>
          <Descriptions.Item label="Link">
            {
              <a href={currentNews?.url} target="_blank" rel="noreferrer">
                {currentNews?.url}
              </a>
            }
          </Descriptions.Item>
          <Descriptions.Item label="Author">
            {currentNews?.by}
          </Descriptions.Item>
        </Descriptions>
        <CommentList comments={comments} />
      </Card>
    </PageLayout>
  );
};

export default NewsPage;
