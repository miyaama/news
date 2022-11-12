import { List, Comment, Button } from "antd";
import { RedoOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { fetchComments } from "../../../store/slices";

import styles from "./CommentList.module.scss";

const CommentList = ({ comments }) => {
  const dispatch = useDispatch();

  const onUpdateComments = () => {
    dispatch(fetchComments());
  };

  return (
    <List
      dataSource={comments}
      locale={{ emptyText: " " }}
      header={
        <div className={styles.comments}>
          {`${comments?.length || 0} ${
            comments?.length !== 1 ? "comments" : "comment"
          }`}
          <Button onClick={onUpdateComments} icon={<RedoOutlined />}>
            Update comments
          </Button>
        </div>
      }
      itemLayout="horizontal"
      renderItem={(props) => <Comment {...props} />}
    />
  );
};

export default CommentList;
