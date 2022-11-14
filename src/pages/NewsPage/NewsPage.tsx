import React, { useEffect, useCallback } from "react";
import { PageHeader, Card, Button, Divider } from "antd";
import { RedoOutlined } from "@ant-design/icons";
import { useParams, useHistory } from "react-router-dom";
import moment from "moment";

import {
  useAppDispatch as useDispatch,
  useAppSelector as useSelector,
} from "../../hooks";
import PageLayout from "../../components/PageLayout";
import { fetchComments } from "../../store/slices";
import CommentItem from "./CommentItem";
import NewsDescription from "./NewsDescription";

import styles from "./NewsPage.module.scss";

type MyParams = {
  id: string;
};

const NewsPage: React.FC = () => {
  const { id } = useParams<keyof MyParams>() as MyParams;

  const dispatch = useDispatch();

  const history = useHistory();

  const currentNews = useSelector((state) =>
    state.news.news.find((newsItem) => newsItem?.id === +id)
  );

  const comments = useSelector((state) => state.news.comments[id] ?? []);

  const isCommentsLoading = useSelector(
    (state) => state.news.isCommentsLoading
  );

  const loadComments = useCallback(() => {
    if (currentNews?.kids) {
      dispatch(
        fetchComments({ newsId: currentNews.id, ids: currentNews?.kids })
      );
    }
  }, [dispatch, currentNews]);

  useEffect(() => {
    loadComments();
  }, [loadComments, currentNews?.kids]);

  if (!currentNews) {
    history.push("/");
    return null;
  }

  const date = currentNews
    ? moment(currentNews?.time * 1000).format("MMM Do YY")
    : "";

  const commentsHeader = `${comments?.length || 0} ${
    comments?.length !== 1 ? "comments" : "comment"
  }`;

  return (
    <PageLayout>
      <Card
        title={
          <PageHeader
            onBack={() => history.goBack()}
            title={currentNews?.title}
            subTitle={date}
          />
        }
      >
        <NewsDescription currentNews={currentNews} />
        <div className={styles.commentsHeader}>
          {commentsHeader}
          <Button
            onClick={loadComments}
            loading={isCommentsLoading}
            icon={<RedoOutlined />}
          >
            Update comments
          </Button>
        </div>
        <Divider />
        {comments.map((comment) => (
          <CommentItem comment={comment} key={comment.id} />
        ))}
      </Card>
    </PageLayout>
  );
};

export default NewsPage;
