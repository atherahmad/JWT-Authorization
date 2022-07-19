import React, {useEffect} from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import teaFetcher from '../../../fetchers/teaFetcher';

function TeaDetails(props) {
    const params = useParams();
    const {id} = params
    const [teaDetails, setTeaDetails] = useState({})

    useEffect(()=>{
       teaFetcher(id)   
       .then(response=>setTeaDetails(response.data))
       .catch(err => err)
    }, [])
    return (
        <div>
            <div>
                Image Block
            </div>
            <div>
                <h3>{teaDetails.teaName}</h3>
            </div>
            <div>
                <h4>
                    Ingredients
                </h4>
                <h4>
                    Recipe
                </h4>
            </div>{
                console.log(teaDetails)
            }
            {teaDetails? teaDetails.status : null}
        </div>
    )
}

export default TeaDetails
