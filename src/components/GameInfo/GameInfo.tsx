import { FC, useEffect, useState } from "react";
import { Container } from "../../styledComponents/Container";
import { Header } from "../Header/Header";
import { useParams } from "react-router-dom";
import { TitleH } from "../../styledComponents/TitleH";
import { Image } from "../../styledComponents/Image";
import { Flex } from "../../styledComponents/Flex";
import { GameDescription } from "./GameDescription";
import Price, { GamePrice } from "./GamePrice";

import axios from "axios";

type GameInfoResponse = {
  title: string;
  nsuid: string;
  productImage: string;
  description: string;
  price: Price;
};

export const GameInfo: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [gameInfo, setGameInfo] = useState<GameInfoResponse>();
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchGameInfo = async () => {
      try {
        const response = await axios.post(
          "https://U3B6GR4UA3-dsn.algolia.net/1/indexes/store_all_products_en_us/query",
          {
            params: `filters=nsuid:${id}`,
          },
          {
            headers: {
              "Content-Type": "application/json",
              "X-Algolia-API-Key": "a29c6927638bfd8cee23993e51e721c9",
              "X-Algolia-Application-Id": "U3B6GR4UA3",
            },
          }
        );

        const data = response.data;

        const game = data.hits[0];
        setGameInfo({
          title: game.title,
          nsuid: game.nsuid,
          productImage: game.productImage,
          description: game.description || "Описание недоступно",
          price: game.price,
        });
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data.message || "Ошибка сети.");
        } else if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Неизвестная ошибка.");
        }
      }
    };

    fetchGameInfo();
  }, [id]);

  return (
    <>
      <Header />
      <Container width="80%" height="100vh" $margin="25px auto" $bgColor="gray">
        <TitleH as="h1" $margin="0 0 0 25px">
          {gameInfo?.title}
        </TitleH>

        <Flex
          $align="flex-start"
          $direction="row"
          $justify="space-around"
          $margin="40px 0 0 0"
        >
          <Image
            src={
              "https://assets.nintendo.com/image/upload/" +
              gameInfo?.productImage
            }
            alt={gameInfo?.title}
            width="40%"
          />

          <GameDescription gameDescription={gameInfo?.description} />
        </Flex>
        <GamePrice price={gameInfo?.price} />
      </Container>
    </>
  );
};