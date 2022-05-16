import { useState } from "react";
import dataStorage from "./dataStorage";

export function useData() {
    let newData = dataStorage;
    // console.log("newData");
    // console.log(newData);

    const getData = () => {
        const dataString = sessionStorage.getItem("data");
        const dataStringJson = JSON.parse(dataString);
        return dataStringJson;
    };

    const [data, setData] = useState({});

    const saveData = (response) => {
        if (response != JSON.stringify(getData())) {
            if (response.grade != undefined) {
                newData.grade = response.grade;
            }
        }
        // TODO: Inserting tags & SDGs into state.
        if (response.tags != undefined) {
            for (let i = 0; i < response.tags.length; i++) {
                if (response.tags[i] in newData.tags) {
                    newData.tags[data.tags] += 1;
                } else {
                    let tagName = response.tags[i];
                    newData.tags[tagName] = 1;
                }
            }
        }

        if (response.sdg != undefined) {
            for (let i = 0; i < response.sdg.length; i++) {
                if (response.sdg[i] in newData.sdg) {
                    newData.sdg[response.sdg[i]] += 1;
                }
            }
        }
        sessionStorage.setItem("data", JSON.stringify(newData));
        setData(newData);
    };

    return {
        setData: saveData,
        data,
    };
}
