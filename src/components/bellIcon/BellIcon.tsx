import Icon from "@mdi/react";
import { mdiBell } from "@mdi/js";

interface BellIconProps {
  count: number;
  handleBellClick: () => void;
}

const BellIcon: React.FC<BellIconProps> = ({ count, handleBellClick }) => {
  return (
    <div
      style={{
        position: "absolute",
        cursor: "pointer",
      }}
      onClick={handleBellClick}
    >
      <>
        {count !== 0 && (
          <div
            style={{
              width: "30px",
              height: "30px",
              border: "2px solid red",
              padding: "3px",
              borderRadius: "1rem",
              fontWeight: "bolder",
              color: "white",
              backgroundColor: "red",
              position: "absolute",
              zIndex: "1",
              top: "0",
              right: "0",
            }}
          >
            <span>{count}</span>
          </div>
        )}
      </>

      <Icon path={mdiBell} size={2} color={"white"} />
    </div>
  );
};

export default BellIcon;
