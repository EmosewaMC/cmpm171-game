// deno-lint-ignore-file
import { useEffect } from "preact/hooks";
import { Button } from "../components/Button.tsx";
import { isWindowsDeviceRoot } from "$std/path/windows/_util.ts";
//NOTE: This route will not be available through the nav later once we setup reaching here from the map route
function dispatchMove(moveNum: number) {
  globalThis.dispatchEvent(new CustomEvent("move" + moveNum));
}
export default function P5Canvas(user: {isLoggedIn: boolean}) {
  const backPathname: string = user.isLoggedIn ? "/worldMap" : "/";
  const retryPathname: string = "/interview";
  useEffect(() => {
    // Dynamically load p5.js
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.js";
    script.onload = () => {
    //deno-lint-ignore
      new p5((p: any) => {
        let bgImg: any;
        let persuasion = 0.5
        p.preload = function () {
            bgImg = p.loadImage("/interview_sketch.png");
        };
        p.setup = function () {
          p.createCanvas(bgImg.width, bgImg.height).parent("p5-canvas");
          p.background(bgImg);
          p.textSize(16)
          p.text('persuasion meter', p.width * 0.2, p.height * 0.85)
        };

        p.draw = function () {
          if (persuasion == 1) {
            p.winScreen()
          }
          if (persuasion == 0) {
            p.loseScreen()
          }
          p.fill(255);
          let barWidth = p.width * 0.6
          let barHeight = p.height * 0.1
          let barX = (p.width - barWidth) / 2
          let barY = p.height - barHeight - p.height * 0.04
          p.rect(barX, barY, barWidth, barHeight)

          p.fill('cadetblue')
          p.rect(barX, barY, barWidth * persuasion, barHeight)
        };

        p.winScreen = function () {
          document.getElementById('winDialog').showModal();
        }

        p.loseScreen = function() {
          document.getElementById('loseDialog').showModal();
        }
        
        p.goTo = function (link) {
          window.location.href = link;
        }
        
        globalThis.addEventListener("move1", () => {
          persuasion += 0.2
          if (persuasion > 1) {
            persuasion = 1
          }
        });
        globalThis.addEventListener("move2", () => {
          persuasion += 0.1
          if (persuasion > 1) {
            persuasion = 1
          }
        });
        globalThis.addEventListener("move3", () => {
          persuasion -= 0.2
          if (persuasion < 0) {
            persuasion = 0
          }
        });
        globalThis.addEventListener("move4", () => {
          persuasion -= 0.1
          if (persuasion < 0) {
            persuasion = 0
          }
        });
      }, document.body);
    };
    document.body.appendChild(script);

    return () => {
      // Cleanup
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <dialog id="winDialog">
        <h2>You Win!</h2>
        <button onClick={ () => window.location.pathname = backPathname}>Back to Map</button>
      </dialog>

      <dialog id="loseDialog">
        <h2>You Lost</h2>
        <button onClick={() => window.location.pathname = retryPathname}>Retry?</button>
        <button onClick={() => window.location.pathname = backPathname}>Back to Map</button>
      </dialog>
      <div>
        <div id="p5-canvas"></div>
        <div class="mx-auto flex flex-row items-center justify-center">
          <Button
            class="w-full font-bold bg-blue-500 hover:bg-blue-700  py-2 px-4 rounded "
            onClick={() => {
              dispatchMove(1);
            }}
          >
            move 1
          </Button>
          <Button
            class="w-full font-bold bg-blue-500 hover:bg-blue-700  py-2 px-4 rounded "
            onClick={() => {
                dispatchMove(2);
            }}
          >
            move 2
          </Button>
          <Button
            class="w-full font-bold bg-blue-500 hover:bg-blue-700  py-2 px-4 rounded "
            onClick={() => {
                dispatchMove(3);
            }}
          >
            move 3
          </Button>
          <Button
            class="w-full font-bold bg-blue-500 hover:bg-blue-700  py-2 px-4 rounded "
            onClick={() => {
                dispatchMove(4);
            }}
          >
            move 4
          </Button>
          
        </div>
      </div>
    </>
  );
}
