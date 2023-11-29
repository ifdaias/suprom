import { useEffect, useState } from "react";
import "./componentStyles/ProgressBar.css";

const ProgressBar = ({completed}) => {
  const [progress, setProgress] = useState("0");

  useEffect(() => {
    if(completed != undefined){
    if (completed.toString().toUpperCase().includes("DESARROLLO")) setProgress("20%");
    else if (completed.toString().toUpperCase().includes("APROBADO")) setProgress("40%");
    else if (completed.toString().toUpperCase().includes("TERMINADO")) setProgress("60%");
    else if (completed.toString().toUpperCase().includes("POR PRESENTAR")) setProgress("80%");
    else if (completed.toString().toUpperCase().includes("FINALIZADO")) setProgress("100%");
    else if (completed.toString().toUpperCase().includes("RECHAZADO")) setProgress("0");
    }
  });

  return (
    <div>
    {(completed != undefined && progress != "0") && (
    <div className="containerStyles">
      <div className="constfillerStyles" style={{ width: `${progress}` }}>
        <span className="LabelStyles">{progress}</span>
      </div>
    </div>
    )}
    </div>
  );
};

export default ProgressBar;
