import Head from "next/head";
import { Player } from "@motionly/player";
import { props } from "../props";
import { useEffect, useState } from "react";
import { useRender } from "@motionly/renderer/dist/sdk";
import { TemplateType } from "@motionly/base";

const baseTemplate: TemplateType = {
  height: 1080,
  width: 1080,
  fps: 30,
  duration: 40,
  background: {
    type: "basic",
    color: "#FFFFFF",
  },
  comps: props,
};

export default function Home() {
  const [template, setTemplate] = useState(baseTemplate);
  const [json, setJson] = useState(JSON.stringify(baseTemplate, null, 2));
  const [error, setError] = useState(false);

  const { media, status, progress, fileUrl } = useRender({
    ...template,
    frame: 0,
  });

  useEffect(() => {
    try {
      setTemplate(JSON.parse(json));
      setError(false);
    } catch (e) {
      setError(true);
    }
  }, [json]);

  return (
    <>
      <Head>
        <title>Motionly example</title>
        <meta
          name="description"
          content="Example app using Motionly player and renderer"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <main>
        <div style={{ maxWidth: "600px", margin: "auto" }}>
          <Player
            comps={props}
            duration={40}
            fps={30}
            height={1080}
            width={1080}
            style={{ width: `100%` }}
            controls
          />
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              margin: "20px 0",
            }}
          >
            {status ? (
              <>
                <p>Rendering...</p>
                <p>{status}</p>
                <progress value={progress} max={1}>
                  {(progress || 0) * 100}%
                </progress>
                {fileUrl && (
                  <a target="_blank" rel="noreferrer" href={fileUrl}>
                    Open file
                  </a>
                )}
              </>
            ) : (
              <button onClick={media}>Render</button>
            )}
          </div>
          <div>
            <textarea
              value={json}
              onChange={(e) => setJson(e.target.value)}
              style={{
                background: error ? "#FF0000" : "#FFFFFF",
                width: "100%",
                minHeight: "300px",
              }}
            />
          </div>
        </div>
      </main>
    </>
  );
}
