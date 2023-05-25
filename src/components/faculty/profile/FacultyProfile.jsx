import React, { useState, useEffect } from 'react'
import { useFacultyProfileUpdateMutation, useGetFacultyDataQuery } from '../../../api/faculty/apiSlice';

const FacultyProfile = () => {
    const {data, isLoading, isError, error} = useGetFacultyDataQuery();
    const [updateProfile, {isLoading: isUpdatedDataLoading}] = useFacultyProfileUpdateMutation();
    const [editMode, setEditMode] = useState(false);
    const [imageUrl, setImageUrl] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    useEffect(() => {
        if (data) {
          const { faculty } = data;
          setName(faculty.facultyName);
          setEmail(faculty.email);
          setPhone(faculty.phone);
          setImageUrl(faculty.facultyImage);
        }
      }, [data]);

    const handleEdit = () => {
        setEditMode(!editMode);
    };



    const handleImageUpload = (event) => {
        console.log('image uplaod called');
        const file = event.target.files[0];
        console.log(file);
        setSelectedFile(file);
        if (file) {
            //File reader api provides reading contents of file async
            const reader = new FileReader();
            //Convert data to url format & trigger onload event
            reader.readAsDataURL(file);
            //Fired when reading operation is completed
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImageUrl(reader.result);
                }
            };
        }
    };

    const handleSave = async () => {
        const formData = new FormData();
        formData.append('facultyImage', selectedFile);
        formData.append('facultyName', name);
        formData.append('email', email);
        formData.append('phone', phone);

        try{
            const res = await updateProfile(formData).unwrap();
            console.log(res);
        } catch(error) {
            console.log(error);
        }
    }

    if(isLoading){
        return(
            <div role="status" className='flex justify-center items-center h-screen'>
            <svg aria-hidden="true" className="w-16 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
            <span className="sr-only">Loading...</span>
        </div>
        )
    }
    if(data){
        console.log(data, 'get fac info');
        return (
            <div className='m-10'>
    
                <div className="bg-cyan-900 text-white py-8 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto">
                        <div className="flex flex-col sm:flex-row items-center justify-between">
                            <div className="flex items-center mb-4 sm:mb-0">
                                <div className="flex-shrink-0">
                                    <img
                                        className="h-16 w-16 rounded-full border-4 border-white"
                                        src={imageUrl}
                                        alt="Profile"
                                    />
                                </div>
                                <div className="ml-4">
                                    <h1 className="text-2xl font-bold">{name}</h1>
                                    <p className="text-xl text-gray-400">{email}</p>
                                    <p className="text-xl text-gray-400">{phone}</p>
    
                                </div>
                            </div>
                            <div className="flex items-center">
                                {!editMode && (
                                    <button
                                        className="bg-white text-cyan-900 py-2 px-4 rounded-md mr-2"
                                        onClick={handleEdit}
                                    >
                                        Edit
                                    </button>
                                )}
                                {editMode ? (
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="hidden"
                                        id="profileImageUpload"
                                    />
                                ) : null}
                                {editMode && (
                                    <>
                                        <button
                                            className="bg-white text-cyan-900 py-2 px-4 rounded-md mr-2"
                                            onClick={handleSave}
                                        >
                                            Save
                                        </button>
                                        <label
                                            htmlFor="profileImageUpload"
                                            className="bg-white text-cyan-900 py-2 px-4 rounded-md cursor-pointer"
                                        >
                                            Upload Picture
                                        </label>
                                    </>
                                )}
                            </div>
                        </div>
                        {editMode ? (
                            <div className="mt-8">
                                <div className="mb-4">
                                    <label htmlFor="name" className="block text-lg font-medium mb-2">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        className="border text-black border-gray-300 rounded-md py-2 px-4 w-full"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="email" className="block text-lg font-medium mb-2">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="border text-black border-gray-300 rounded-md py-2 px-4 w-full"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="phone" className="block text-lg font-medium mb-2">
                                        Phone
                                    </label>
                                    <input
                                        type="text"
                                        id="phone"
                                        className="border text-black border-gray-300 rounded-md py-2 px-4 w-full"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                </div>
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
    
    
        );
    }


}

export default FacultyProfile