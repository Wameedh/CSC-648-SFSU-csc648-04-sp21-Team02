import {useEffect, useState} from 'react'

import Modal from './Modal'

import styles from './EditPetDetails.module.css'

import Select from 'react-select';

import makeAnimated from 'react-select/animated';
import axios from 'axios';

function AddAPet({display,onClose}) {

    //States to be set and sent to db
    const [petName,setPetName] = useState('');
    const [petColor, setPetColor] = useState([]);
    const [petSize, setPetSize] = useState();
    const [petAge, setPetAge] = useState();
    const [petType, setPetType] = useState();
    const [dogBreed, setDogBreed] = useState([]);
    const [catBreed, setCatBreed] = useState([]);


    //States for dropdown menu options
    const [typeOptions, setTypeOptions] = useState([]);

    const [dogBreedOptions, setDogBreedOptions] = useState([]);

    const [catBreedOptions, setCatBreedOptions] = useState([]);

    const [colorOptions, setColorOptions] = useState([]);

    const [sizeOptions, setSizeOptions] = useState([]);

    const [ageOptions, setAgeOptions] = useState([]);



    function customTheme(theme){
        return {
            ... theme,
            colors:{
                ... theme.colors,
                primary25: '#B3B3B3',
                primary:'#1CB48F',
            }
        }
    }

    useEffect(() => {
        axios.get('/api/pet-types')
        .then(response =>{
            setTypeOptions(response.data);
        })
        .catch(err =>{

        })

        axios.get('/api/dog-breeds')
        .then(response =>{
            setDogBreedOptions(response.data);
        })
        .catch(err =>{

        })

        axios.get('/api/cat-breeds')
        .then(response =>{
            setCatBreedOptions(response.data);
        })
        .catch(err =>{
            
        })

        axios.get('/api/ages')
        .then(response =>{
            setAgeOptions(response.data);
        })
        .catch(err =>{

        })

        axios.get('/api/sizes')
        .then(response =>{
            setSizeOptions(response.data);
        })
        .catch(err =>{
            
        })

        axios.get('/api/colors')
        .then(response =>{
            setColorOptions(response.data);
        })
        .catch(err =>{
            
        })
    }, [])

    function createPetProfile(event){
        event.preventDefault();
        // if(petType.label != 'Cat'){  //make sure Cat or dog breeds are null
        //     setCatBreed([]);
        // }

        // if(petType.label != 'Dog'){
        //     setCatBreed([]);
        // }

        axios.post('/api/create-pet-profile',{
            name: petName,
            type: petType,
            age: petAge,
            color: petColor,
            dogBreed: dogBreed,
            catBreed: catBreed,
            size: petSize
        })
        .then(response =>{
            console.log(response);
            onClose();
        })
        .catch(err =>{
            console.log(err);
        })
    }

    const animatedComponents = makeAnimated();

    return (
        <Modal display={display} onClose={onClose}>
            <form onSubmit={createPetProfile}>
                <div className={styles['edit-pet-details-header']}>Add a Pet</div>
                <div className={styles['edit-pet-details-container']}>
                    <div className={styles['edit-pet-details-name']}>
                        <label for="name">Name</label>
                        <input 
                            type="text" 
                            id="name" 
                            name="pet_name" 
                            maxLength="25"
                            required
                            value={petName}
                            // value={props.profile.userName}
                            // onChange={event => props.updateProfile('userName', event.target.value)} 
                            onChange={event => setPetName(event.target.value)}
                        />
                    </div>
                    <div className={styles['edit-pet-details-type']}>
                        <label for="type">Type</label>
                        <Select id="type" name="pet_type"
                            // onChange={props.updatePetType}
                            onChange={setPetType}
                            options={typeOptions}
                            theme={customTheme}
                            value={petType}
                            placeholder="Select Pet Type"
                            isSearchable
                        />
                    </div>
                    

                    <div className={styles['edit-pet-details-color']}>
                        <label for="color">Color(s)</label>
                        <Select id="color" name="pet_color"
                            onChange={setPetColor}
                            options={ colorOptions}
                            theme={customTheme}
                            value={petColor}
                            placeholder="Select Pet Color(s)"
                            isSearchable
                            isMulti
                        />
                    </div>

                    <div className={styles['edit-pet-details-age']}>
                        <label for="age">Age</label>
                        <Select id="age" name="pet_age"
                            onChange={setPetAge}
                            options={ageOptions}
                            theme={customTheme}
                            value={petAge}
                            placeholder="Select Pet Age"
                            isSearchable
                        />
                    </div>

                    <div className={styles['edit-pet-details-size']}>
                        <label for="size">Size</label>
                        <Select id="size" name="pet_size"
                            onChange={setPetSize}
                            options={ sizeOptions}
                            theme={customTheme}
                            value={petSize}
                            placeholder="Select Pet Size"
                            isSearchable
                        />
                    </div>
                    {petType && petType.label == 'Dog' && <div className={styles['edit-pet-details-breed']}>
                        <label for="breed">Breed</label>
                        <Select id="breed" name="pet_breed"
                            // onChange={props.updatePetBreed}
                            onChange={setDogBreed}
                            options={ dogBreedOptions}
                            theme={customTheme}
                            placeholder="Select Dog Breed"
                            isSearchable
                            isMulti
                            components={animatedComponents}
                        />
                    </div>}
                    {petType && petType.label == 'Cat' && <div className={styles['edit-pet-details-breed']}>
                        <label for="breed">Breed</label>
                        <Select id="breed" name="pet_breed"
                            // onChange={props.updatePetBreed}
                            onChange={setCatBreed}
                            options={ catBreedOptions}
                            theme={customTheme}
                            placeholder="Select Cat Breed"
                            isSearchable
                            isMulti
                            components={animatedComponents}
                        />
                    </div>}
                    <button className={styles['edit-pet-details-submit']} type='submit'>Submit</button>
                </div>
            </form>
        </Modal>
    )
}

export default AddAPet
