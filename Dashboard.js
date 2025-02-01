import React, { useState } from "react";
import { Page, Card, Button, TextField } from "@shopify/polaris";
import axios from "axios";

const Dashboard = () => {
  const [productName, setProductName] = useState("");
  const [features, setFeatures] = useState("");
  const [description, setDescription] = useState("");

  const generateDescription = async () => {
    const response = await axios.post("http://localhost:5000/generate-description", {
      productName,
      features: features.split(","),
    });

    setDescription(response.data.description);
  };

  return (
    <Page title="AI-Powered Product Descriptions">
      <Card sectioned>
        <TextField label="Product Name" value={productName} onChange={setProductName} />
        <TextField label="Features (comma-separated)" value={features} onChange={setFeatures} />
        <Button onClick={generateDescription} primary>Generate AI Description</Button>
      </Card>
      {description && (
        <Card sectioned>
          <h3>Generated Description:</h3>
          <p>{description}</p>
        </Card>
      )}
    </Page>
  );
};

export default Dashboard;