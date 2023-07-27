import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { getNotification } from "../../services/services";

const UserNotification = () => {
  const param: any = useParams();
  const [text, setText] = useState("");
  const { data, isFetched } = useQuery(["getNotification"], getNotification, {
    onSuccess: (data: any) => {
      const notify = data.data.data.filter((el: any) => el._id === param.id);
      setText(notify[0].message);
    },
  });


  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "20px",
      }}
    >
      <Card
        bg="dark"
        text="white"
        style={{ width: "50rem", minHeight: "8rem", height:'auto', padding: "30px" }}
      >
        {isFetched && text}
      </Card>
    </div>
  );
};

export default UserNotification;
