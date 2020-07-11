import React from 'react'

const ShowDataCard = ({ title, data }) => {
    return (
        <div className="showdatacard">
            <h3 className="showdatacard-title" >{title}</h3>
            <h1 className="showdatacard-data" >{data}</h1>
        </div>
    );
}

export const ShowListCard = ({ title, data }) => {
    // console.log("List ",data)\

    //Calibrating Machine API is inconsistent with other API.
    if (title === "GX machine that needs calibration in 6 months" || title === "GX Machine Running Today") {
        return (
            <div className="showlistcard">
                <h3 className="title" >{title}</h3>

                {data ?
                    data.map(element => {
                        return <p className="showlistcard-data"  >{element.site_name}:{element.code}</p>
                    }) : <div>No data here</div>}
                    
            </div>
        )
    }
    else {
        return (
            <div className="showlistcard">
                <h3 className="title" >{title}</h3>
                {data ?
                    data.map(element => {
                        return <p className="showlistcard-data"  >{element.site?.name}:{element.code}</p>
                    })
                    : <div>No data</div>
                }
            </div>
        );

    }
}
export default ShowDataCard;