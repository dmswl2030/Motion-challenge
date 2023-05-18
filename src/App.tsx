import styled from "styled-components";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1%;
  div:first-child,
  div:last-child {
    grid-column: span 1;
  }
`;
const Box = styled(motion.div)`
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 10px;
  width: 300px;
  height: 200px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  position: relative;
  &:hover {
    transform: scale(1.1);
  }
`;

const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const overlay = {
  hidden: { backgroundColor: "rgba(0, 0, 0, 0)" },
  visible: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
  exit: { backgroundColor: "rgba(0, 0, 0, 0)" },
};

const CircleSwitch = styled.button`
  width: 100px;
  height: 50px;
`;
const Circle = styled(motion.div)`
  background-color: #00a5ff;
  border-radius: 100%;
  height: 50px;
  width: 50px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

function App() {
  const [id, setId] = useState<null | string>(null);
  const [clicked, setClicked] = useState(false);
  const toggleClicked = () => setClicked((prev) => !prev);

  return (
    <Wrapper>
      <Grid>
        {["1", "2", "3", "4"].map((id) => (
          <Box
            whileHover={{
              scale: 1.1,
              originX: id === "1" || id === "3" ? 1 : 0,
              originY: id === "1" || id === "2" ? 1 : 0,
              transformOrigin:
                id === "1"
                  ? "left top"
                  : id === "2"
                  ? "right top"
                  : id === "3"
                  ? "left bottom"
                  : "right bottom",
            }}
            onClick={() => setId(id)}
            key={id}
            layoutId={id}
          >
            {id === "2" && !clicked && <Circle layoutId="moveCircle" />}
            {id === "3" && clicked && <Circle layoutId="moveCircle" />}
          </Box>
        ))}
      </Grid>
      <AnimatePresence>
        {id ? (
          <Overlay
            variants={overlay}
            onClick={() => setId(null)}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Box
              layoutId={id}
              style={{
                width: 300,
                height: 200,
                backgroundColor: "rgba(255, 255, 255, 1)",
              }}
            />
          </Overlay>
        ) : null}
      </AnimatePresence>
      <CircleSwitch onClick={toggleClicked}>Switch</CircleSwitch>
    </Wrapper>
  );
}

export default App;
