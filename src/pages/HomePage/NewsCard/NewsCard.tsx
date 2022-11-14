import React from "react";
import { Card, Col, Rate } from "antd";
import moment from "moment";
import { Link } from "react-router-dom";

import { NewsItem } from "../../../shared/types";

interface Props {
  newsItem: NewsItem;
}

const NewsCard: React.FC<Props> = ({ newsItem }) => {
  return (
    <Col
      key={newsItem.id}
      xs={{ span: 24 }}
      sm={{ span: 24 }}
      md={{ span: 12 }}
      xl={{ span: 12 }}
    >
      <Card
        key={newsItem.id}
        title={<Link to={`/news/${newsItem.id}`}>{newsItem.title}</Link>}
        extra={
          <span>{`${moment(newsItem.time * 1000).format("MMM Do YY")}`}</span>
        }
      >
        <p>{`Author: ${newsItem.by}`}</p>
        <Rate disabled defaultValue={newsItem.score} />
      </Card>
    </Col>
  );
};

export default NewsCard;
