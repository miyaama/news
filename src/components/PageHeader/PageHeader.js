import React from 'react';
import { Typography, Layout } from "antd";
import { Link } from "react-router-dom";

import styles from "./PageHeader.module.scss";

const { Title } = Typography;

const { Header } = Layout;

const PageHeader = () => {
  return (
    <Header className={styles.header}>
      <Link to="/">
        <Title level={3} className={styles.title} />
      </Link>
    </Header>
  );
};

export default PageHeader;
