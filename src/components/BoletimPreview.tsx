import { Card } from "antd";
import React, { useRef, useEffect } from "react";
//import "./canvasPolifyll.js";

type BoletimPreviewProps = {
  fields: Array<object>;
};
const BoletimPreview = (props: BoletimPreviewProps) => {
  const canvasRef = useRef(null);
  const { fields } = props;

  //984 1280
  useEffect(() => {
    const canvas = canvasRef.current || {
      style: { letterSpacing: "" },
      getContext: (str: string): any => str,
    };

    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#e4e4e4";
    const img = new Image();
    img.src = "/boletim-gv-gabarito.jpg";
    img.onload = function () {
      ctx.drawImage(img, 0, 0);

      ctx.textBaseline = "top";
      props.fields.forEach((label: any) => {
        ctx.textAlign = label.textAlign;
        //canvas.style.letterSpacing = ".2";
        ctx.font = label.font;
        ctx.fillStyle = label.color;
        ctx.strokeStyle = label.color;
        ctx.lineWidth = 2;
        ctx.fillText(
          label.value,
          label.textAlign === "right" ? label.x + label.weight : label.x,
          label.y
        );
        ctx.strokeText(
          label.value,
          label.textAlign === "right" ? label.x + label.weight : label.x,
          label.y
        );
      });

      // ctx.fillText("129", 249, 715);
    };

    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }, []);

  return (
    <Card
      className="report-preview"
      bodyStyle={{ display: "none" }}
      cover={
        <canvas
          ref={canvasRef}
          {...props}
          width={984}
          height={1280}
          style={{ width: "100%" }}
        />
      }
    ></Card>
  );
};

export default BoletimPreview;
//style={{ width: "984px", height: "1280px" }}
