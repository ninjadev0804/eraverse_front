import styled from "styled-components";

const Button = styled.div`
  &:hover {
    text-shadow: 0 0 10px rgba(255, 255, 255, 1);
  }
`;

const ButtonText = styled.div`
  &:hover {
    // font-weight: bold;
  }
`;

export default function ButtonSec({ title, textcolor }: any) {
  return (
    <>
      {textcolor ? (
        <div
          data-testid="optional-buttonSec"
          className="cursor-pointer flex justify-enter items-center h-full px-[16.5px] border-[1px] border-[#4E4E4E] border-solid rounded-lg transition-all duration-700"
        >
          <div
            className={`text-[14px] font-medium ${
              textcolor ? "text-[#ffffff50]" : ""
            } `}
          >
            {title}
          </div>
        </div>
      ) : (
        <Button
          data-testid="default-buttonSec"
          className="cursor-pointer flex justify-enter items-center h-full px-[16.5px] border-[1px] border-[#4E4E4E] border-solid rounded-lg transition-all duration-700 drop-shadow-none hover:drop-shadow-[0_30px_30px_rgb(0,0,0)]"
        >
          <ButtonText
            data-testid="button-text"
            className={`text-[14px] font-medium ${
              textcolor ? "text-[#ffffff50]" : ""
            } `}
          >
            {title}
          </ButtonText>
        </Button>
      )}
    </>
  );
}
