import { useEffect, useState } from 'react';
import Card from '../UI/Card';
import styles from './AvailableMeals.module.css'
import MealItem from './MealItem/MealItem';


  const AvailabeMeals =()=>{

    // fetch data from firebase database
    const [meals, setMeals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [httpError, setHttpError] = useState();

    useEffect(() => {
        const fetchMeals = async () =>{
            const response = await fetch('https://react-http-d7aa5-default-rtdb.firebaseio.com/meals.json');

            if (!response.ok){
                throw new Error('Something went wrong');
            }

            const responseData = await response.json();

            const loadedMeals = [];

            for (const key in responseData){
                loadedMeals.push({
                    id: key,
                    name: responseData[key].name,
                    description: responseData[key].description,
                    price: responseData[key].price,
                });
            }

            setMeals(loadedMeals);
            setLoading(false);
        }

        fetchMeals().catch((error) => {
            setLoading(false);
            setHttpError(error.message);
        });
    }, []);

    // loading state
    if (loading){
        return (
            <section className={styles.mealsLoad}>
                <p>Loading...</p>
            </section>
        );
    }

    if (httpError){
        return (
            <section className={styles.httpsError}>
                <p>{httpError}</p>
            </section>
        )
    }

    const mealsList = meals.map((meal) =>(
        <MealItem
            key={meal.id}
            id={meal.id}
            name={meal.name}
            description={meal.description}
            price={meal.price}
        />
    )
    );
    return(
        <section className={styles.meals}>
            <Card>
                <ul>
                    {mealsList}
                </ul>
                
            </Card>
        
        </section>
        
    )
  }

  export default AvailabeMeals;