import React from "react";
import { Descriptions } from "antd";

import { NewsItem } from "../../../shared/types";

interface Props {
  currentNews: NewsItem;
}

const NewsDescription: React.FC<Props> = ({ currentNews }) => {
  return (
    <Descriptions size="small" column={1}>
      <Descriptions.Item label="Link">
        {
          <a href={currentNews?.url} target="_blank" rel="noreferrer">
            {currentNews?.url}
          </a>
        }
      </Descriptions.Item>
      <Descriptions.Item label="Author">{currentNews?.by}</Descriptions.Item>
    </Descriptions>
  );
};

export default NewsDescription;
