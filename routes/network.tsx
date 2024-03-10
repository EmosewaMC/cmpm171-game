import { NetworkButton, NetworkProps, NetworkList} from "../islands/NetworkButton.tsx";
import { getUser } from "$utils/get_user.ts";
import type { Player } from "gameData/playerStats.ts";
import AsyncLayout from "../layouts/asyncLayout.tsx";
import { translate } from "gameData/locale.ts";

// import Form from "../islands/Form.tsx";

// export default P5Canvas;

//NOTE: This route will not be available through the nav later once we setup reaching here from the map route
export default async function Home(req: Request) {
  const player = await getUser(req) as Player;
  if (!player) {
	return (
	  <div class="px-4 py-8 mx-auto bg-[#86efac]">
		<div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
		  <h1 class="text-4xl font-bold">{translate("WELCOME_TO_THE_JOBHUNT", req)}</h1>
		  <a class="my-4 text-blue-500 underline" href="/api/auth/login">
		  	{translate("SIGN_IN_TO_GET_STARTED", req)}
		  </a>
		</div>
	  </div>
	);
  }
  return (
    <div class="px-4 py-8 mx-auto bg-[#86efac]">
      <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
        <h1 class="text-4xl font-bold">{translate("MY_NETWORK", req)}</h1>
        <AsyncLayout player={player}>
          {({ player }) => (
            <div>
		          <NetworkList player={player}/>
		          <NetworkButton player={player}/>
            </div>
          )}
        </AsyncLayout>
      </div>
    </div>
  );
}
