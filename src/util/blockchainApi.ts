import fetch from "cross-fetch";
import {
  Configuration,
  BlocksApi,
  Block,
  BlockListResponse,
} from "@stacks/blockchain-api-client";
import { apiToLocalUnixTime } from "./timeTools";

const apiConfig = new Configuration({
  fetchApi: fetch,
  basePath: process.env.REACT_APP_STX_API_ENDPOINT,
});

let blocksApi = new BlocksApi(apiConfig);
// const MAX_I32 = 2147483647; // maximum value and raise diferent error in case this happens!

export const getBlockUnixTime = (height: number): Promise<number> => {
  return new Promise((resolve, reject) => {
    (async () => {
      let block: Block;
      try {
        block = await blocksApi.getBlockByHeight({ height });
        resolve(apiToLocalUnixTime(block.burn_block_time));
      } catch (e: any) {
        // 404 not found
        if (e.status === 404)
          reject({
            status: e.status,
            statusText: e.statusText,
          });
        // wrong URL or unavailable
        else
          reject({
            status: 400,
            statusText: "Wrong URL or server is unavailable",
          });
      }
    })();
  });
};

export const getLastBlockHeight = (): Promise<Block> => {
  return blocksApi
    .getBlockList({ offset: 0, limit: 1 })
    .then((blockList: BlockListResponse) => blockList.results[0]);
};
