import React from "react";
import "./definitions.css";

const Definitions = ({word, category, meanings}) => {
  return (
  
  <div className="meanings">
    {word === "" ? (<span className="sub-title">Start typing for search</span>
    ) : (
        meanings.map((mean)=> mean.meanings.map((item)=> (
            item.definitions.map((def)=>
            <div className="single-mean">
                {def.definition}
                <hr style={{ backgroundColor:'black', width:"100%"}}/>

                { def.example && (
                    <span>
                        Example: {def.example}
                    </span>
            )}
            {def.synonyms && (
                <span>
                    Synonyms: {def.synonyms}
                </span>
            )}
            </div>
        )
        )))   
        // "nnn"

    )}
  </div>
  );
};

export default Definitions;