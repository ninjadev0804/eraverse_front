import React, { useState } from "react";
import styled from "styled-components";

const Button = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.5px 3px;
  background-color: #3e3e3e;
  border-radius: 4px;
`;

const ButtonText = styled.div`
  text-align: center;
  font-size: 1rem;

  ${Button}:hover & {
    text-shadow: 0 0 20px rgba(255, 255, 255, 1);
  }
`;
export default function ErrorNoError() {
  const [connected, setConnected] = useState(false);
  const handleButtonClick = () => {
    setConnected((prevConnected) => !prevConnected);
  };

  const ConnectedButton = (
    <div
      className="cursor-pointer flex justify-enter items-center px-[16.5px] border-[1px] bg-[#3E3E3E] border-solid border-[#4E4E4E] text-[#ffffff30] rounded-md mobile:px-2"
      onClick={handleButtonClick}
    >
      <Button>
        <ButtonText className="text-[14px]">
          <div>No. of NFTs</div>
        </ButtonText>
      </Button>
    </div>
  );

  const DisconnectedButton = (
    <div
      className="cursor-pointer flex justify-enter items-center px-[16.5px] border-[1px] bg-[#3E3E3E] border-solid border-[#EF4040BF] rounded-lg"
      onClick={handleButtonClick}
    >
      <Button>
        <ButtonText className="text-[14px]">
          <div className="text-[#EF4040BF]">Invalid input</div>
        </ButtonText>
      </Button>
    </div>
  );

  return <>{connected ? ConnectedButton : DisconnectedButton}</>;
}
