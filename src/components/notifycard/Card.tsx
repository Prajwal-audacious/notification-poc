import { Button, Card } from "react-bootstrap";

interface card {
  text: string;
  handleClick: any;
  id?: number | string;
  isRead: boolean;
}

export const InsideCard: React.FC<card> = ({
  text,
  handleClick,
  id,
  isRead,
}) => {
  return (
    <>
      <div>
        <Card
          bg={isRead ? "light" : "dark"}
          text={isRead ? "dark" : "light"}
          style={{
            width: "100%",
            margin: "5px",
            height: "4rem",
            display: "flex",
          }}
        >
          <Card.Body>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Card.Text>
                {text ? text.substring(0, 40) + ".........." : ""}
              </Card.Text>
              <Button data-id={id} onClick={handleClick}>
                view
              </Button>
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};
