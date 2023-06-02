import React from "react";
import { Dimmer, Loader } from "semantic-ui-react";

interface Props{
    //give it a darker or lighter background
    inverted? : boolean;
    content? : string;
}

export default function LoadingComponent({inverted=false, content='loading...'}){
    return (
        <Dimmer active={true} inverted={false}>
            <Loader content={content}/>
        </Dimmer>
    )
}