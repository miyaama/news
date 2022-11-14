import React from "react";
import Layout from "antd/lib/layout/layout";

import PageHeader from "../PageHeader";
import styles from "./PageLayout.module.scss";

const PageLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <Layout className={styles.layout}>
      <PageHeader />
      <div className={styles.content}>{children}</div>
    </Layout>
  );
};

export default PageLayout;
