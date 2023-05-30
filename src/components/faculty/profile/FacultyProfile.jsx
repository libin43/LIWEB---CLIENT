import React, { useState, useEffect } from 'react'
import { FaUpload } from 'react-icons/fa';
import { RiDeleteBinLine } from 'react-icons/ri';
import { Navigate } from 'react-router-dom';
import {toast} from 'react-toastify';
import nouser from '../../../assets/images/no-user.jpg'
import DeleteModal from '../modal/DeleteModal';
import { useFacultyRemoveImageMutation, useFacultyUpdateProfileMutation, useFacultyUploadImageMutation, useGetFacultyDataQuery } from '../../../api/faculty/apiSlice';


const FacultyProfile = () => {

    const [editMode, setEditMode] = useState(false);
    const [imageUrl, setImageUrl] = useState(null);
    const [imageName, setImageName] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [formData, setFormData] = useState({name:'', email:'', phone:''})
    const [initialFormData, setInitialFormData] = useState({name:'', email:'', phone:''})
    const [isFormDirty, setIsFormDirty] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const {data, isLoading, isError, error} = useGetFacultyDataQuery();
    const [deleteImage, {isLoading: isLoadingDeletion}] = useFacultyRemoveImageMutation();
    const [uploadProfileImage, {isLoading: isUpdatedImageLoading}] = useFacultyUploadImageMutation();
    const [updatedProfile, {isLoading: isUpdatedProfileLoading}] = useFacultyUpdateProfileMutation();


    const handleNameChange = (e) => {
        setFormData((prevState) => ({ ...prevState, name: e.target.value }));
      };
      
      const handleEmailChange = (e) => {
        setFormData((prevState) => ({ ...prevState, email: e.target.value }));
      };
      
    const handlePhoneChange = (e) => {
        const phoneValue = parseInt(e.target.value);
        if (!isNaN(phoneValue)) {
            setFormData((prevState) => ({ ...prevState, phone: phoneValue }));
        }
    };

    const openModal = () => {
        setIsModalOpen(true);
      };

      const closeModal = () => {
        setIsModalOpen(false);
      };

    useEffect(() => {
        if (data) {
          const { faculty } = data;
          setFormData({name: faculty.facultyName, email: faculty.email, phone: faculty.phone})
          setInitialFormData({name: faculty.facultyName, email: faculty.email, phone: faculty.phone})
          setImageUrl(faculty.facultyImageUrl);
          setImageName(faculty.facultyImage)
        }
      }, [data]);

      useEffect(() => {
        const isDirty = Object.keys(formData).some(
          (key) => formData[key] !== initialFormData[key]
        );
        setIsFormDirty(isDirty);
      }, [formData, initialFormData]);

    const handleEdit = () => {
        setEditMode(!editMode);
    };

    const authError = () => {
            toast.warn('Unauthorized Access', {
                position: "bottom-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                })
                localStorage.removeItem('facultyToken');
                return(
                  <Navigate to={'/faculty/login'}/>
                )
    }

    const handleImageChange = (event) => {
        console.log('image uplaod called');
        const file = event.target.files[0];
        setSelectedFile(file);
        if (file) {
        console.log(file,'filename');

            //File reader api provides reading contents of file async
            const reader = new FileReader();
            //Convert data to url format & trigger onload event
            reader.readAsDataURL(file);
            //Fired when reading operation is completed
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImageUrl(reader.result);
                    console.log(imageUrl, 'imageurl called');
                }
            };
        }
    };

    const handleUpload = async () => {
        if (!selectedFile){
            toast.warn('Choose any picture', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
                return;
        }
        const formData = new FormData();
        formData.append('facultyImage', selectedFile);
        try{
            const res = await uploadProfileImage(formData).unwrap();
            console.log(res,'res of updated pro');
            setSelectedFile(null);
        } catch(error) {
            console.log(error);
            if(error?.status === 401){
                authError();
            }
        }
    }

    const handleDelete = async () => {
        closeModal();
        try{
            const res = await deleteImage(imageName).unwrap()
            console.log(res,'res in delete');
            if(res?.success){
                setImageName(res.success.facultyImage)
                setSelectedFile(null);
            }
        }
        catch(error) {
            console.log(error);
            if(error?.status === 401){
                authError();
            }
        }
      };

    const handleSave = async () => {
        console.log('save called');
        console.log(formData);
        try{
            const res = await updatedProfile(formData).unwrap();
            console.log(res);
        }
        catch(error) {
            console.log(error);
            if(error?.status === 401){
            }
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
    if(isError){
        console.log(error);
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
                                    {isLoadingDeletion || isUpdatedImageLoading ?
                                        <div role="status" className='flex justify-center items-center'>
                                            <svg aria-hidden="true" className="w-16 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                            </svg>
                                            <span className="sr-only">Loading...</span>
                                        </div>
                                        :
                                        <img
                                            className="h-16 w-16 rounded-full border-4 border-white"
                                            src={imageUrl !==null ? imageUrl : nouser}
                                            alt="Profile"
                                        />

                                    }
                                </div>
                                <div className="ml-4">
                                    <h1 className="text-2xl font-bold">{formData.name}</h1>
                                    <p className="text-xl text-gray-400">{formData.email}</p>
                                    <p className="text-xl text-gray-400">{formData.phone}</p>
    
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
                                        onChange={handleImageChange}
                                        className="hidden"
                                        id="profileImageUpload"
                                        key={imageUrl}
                                    />
                                ) : null}
                                {editMode && (
                                    <>
                                    {
                                        imageName!==null ? <RiDeleteBinLine className='m-3 w-8 h-8' onClick={openModal}/>:''
                                    }
                                    <DeleteModal isOpen={isModalOpen} onClose={closeModal} onDelete={handleDelete} />
                                        {selectedFile!==null ?
                                        <button
                                        className="bg-white text-cyan-900 py-2 px-4 rounded-md mr-2"
                                        onClick={handleUpload}
                                    >
                                        <FaUpload/>
                                    </button>
                                    :
                                    ''
                                    }
                                        <label
                                            htmlFor="profileImageUpload"
                                            className="bg-white text-cyan-900 py-2 px-4 rounded-md cursor-pointer"
                                        >
                                            Choose Picture
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
                                        value={formData.name}
                                        onChange={handleNameChange}
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
                                        value={formData.email}
                                        onChange={handleEmailChange}
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
                                        value={formData.phone}
                                        onChange={handlePhoneChange}
                                    />
                                </div>
                                <div className="mb-4 text-center">
                                    {
                                        isFormDirty ?
                                        <button className="save-button bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-md text-base sm:text-lg"
                                        onClick={handleSave}
                                        >
                                        Save
                                    </button>
                                    :
                                    null
                                    }
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