import { useState ,useEffect } from "react";
import api from "../auth/api";
import { Button } from "../ui/Button";
import { useParams } from "react-router-dom";

export const Appliers = () => {
    const {id} = useParams()
    return(
        <div>
            <div>
                well come to Applisers page 
            </div>
        </div>
    )
}