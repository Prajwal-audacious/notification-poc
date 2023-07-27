import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { InsideCard } from "../../components/notifycard/Card";
import { useNavigate } from "react-router-dom";
import {
  getNotification,
  isReadAllNotification,
} from "../../services/services";
import { useQuery } from "@tanstack/react-query";
import { useIsReadNotification } from "../hooks/hooks";

const Notification = () => {
  const [enable, setEnable] = useState(false);
  const navigate = useNavigate();
  const [notificationData, setNotificationData] = useState([]);
  const { mutateAsync: isReadMutation } = useIsReadNotification();
  const { isFetched, refetch } = useQuery(
    ["getNotification"],
    getNotification,
    {
      onSuccess: (data: any) => setNotificationData(data.data.data.reverse()),
    }
  );

  useEffect(() => {
    refetch();
  }, [enable]);

  const handleClick = async (e: any) => {
    const id = e.target.getAttribute("data-id");
    console.log(id);
    try {
      const { data } = await isReadMutation(id);
      console.log(data);
      navigate(`/notification/${id}`);
    } catch (error: any) {
      console.log(error.message);
    }
  };
  const { data } = useQuery(["readAll"], isReadAllNotification, {
    enabled: enable,
  });

  console.log(data);

  const handleReadAllNotification = () => {
    console.log("all notification treaded succesfully");
    setEnable(true);
    setTimeout(() => {
      setEnable(false);
      refetch();
    }, 1000);
  };

  return (
    <div
      style={{
        width: "100%",
        height: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          padding: "1rem 15rem",
        }}
      >
        <h2>Notification Page</h2>{" "}
        <Button onClick={handleReadAllNotification}>Read All</Button>
      </div>
      <div style={{ width: "80%" }}>
        <Card bg="light" style={{ padding: "10px" }}>
          {isFetched &&
            notificationData.map((el: any) => {
              return (
                <div key={el.id}>
                  <InsideCard
                    handleClick={handleClick}
                    text={el.message}
                    id={el._id}
                    isRead={el.isRead}
                  />
                </div>
              );
            })}
        </Card>
      </div>
    </div>
  );
};

export default Notification;
