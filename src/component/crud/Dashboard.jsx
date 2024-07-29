import { addDoc, collection, deleteDoc, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { notification } from 'antd';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase';

const Dashboard = () => {
    const [blog, setBlog] = useState([]);
    const [title, setTitle] = useState('');
    const [descript, setDescript] = useState('');
    const [img, setImg] = useState('');
    const [show, setShow] = useState(true);
    const [id, setId] = useState('');
    const { dispatch } = useContext(AuthContext);
    const navigate = useNavigate();

    const data = collection(db, 'blogs');

    useEffect(() => {
        const unsubscribe = onSnapshot(data, (snapshot) => {
            const malumot = snapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id
            }));
            setBlog(malumot);
        });
        return () => unsubscribe();
    }, []);

    const handleCreate = async (e) => {
        e.preventDefault();
        if (title === "" || descript === "" || img === "") {
            return notification.error({
                message: "Input bo'sh",
                description: "Iltimos, barcha maydonlarni to'ldiring"
            });
        } else {
            await addDoc(data, {
                title,
                descript,
                img,
                id: uuidv4()
            });

            notification.success({
                message: "Malumot yuborildi",
                description: "Siz kiritgan malumot yuborildi"
            });

            setDescript("");
            setTitle("");
            setImg("");
        }
    };

    const handleDelete = async (id) => {
        await deleteDoc(doc(db, 'blogs', id));
    };

    const handleEdit = (id, title, descript, img) => {
        setId(id);
        setTitle(title);
        setDescript(descript);
        setImg(img);
        setShow(false);
    };

    const handleUpdate = async () => {
        await updateDoc(doc(db, 'blogs', id), { title, descript, img });
        setShow(true);
        setId('');
        setTitle('');
        setDescript('');
        setImg('');
    };

    const logOut = () => {
        dispatch({ type: "LOGOUT", payload: null });
        navigate('/');
    };

    return (
        <div className='max-w-4xl mx-auto p-4'>
            <h2 className='text-2xl font-semibold text-center mb-4'>Blogs</h2>
            <button onClick={logOut} className='block mx-auto mb-4 px-4 py-2 bg-orange-500 text-white font-bold rounded-md hover:bg-orange-600'>Log Out</button>
            
            <form className='mb-6 space-y-4'>
                <div>
                    <label className='block text-sm font-medium mb-2'>
                        Rasm URL
                        <input 
                            type="text" 
                            value={img} 
                            onChange={(e) => setImg(e.target.value)} 
                            className='block w-full p-2 border border-gray-300 rounded-md'
                        />
                    </label>
                </div>
                <div>
                    <label className='block text-sm font-medium mb-2'>
                        Nomi
                        <input 
                            type="text" 
                            value={title} 
                            onChange={(e) => setTitle(e.target.value)} 
                            className='block w-full p-2 border border-gray-300 rounded-md'
                        />
                    </label>
                </div>
                <div>
                    <label className='block text-sm font-medium mb-2'>
                        Narxi
                        <input 
                            type="text" 
                            value={descript} 
                            onChange={(e) => setDescript(e.target.value)} 
                            className='block w-full p-2 border border-gray-300 rounded-md'
                        />
                    </label>
                </div>
                <button 
                    className='block w-full px-4 py-2 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700'
                    onClick={show ? handleCreate : handleUpdate}
                >
                    {show ? 'Create' : 'Update'}
                </button>
            </form>

            <div className='overflow-x-auto'>
                <table className='min-w-full divide-y divide-gray-200'>
                    <thead className='bg-gray-800 text-white'>
                        <tr>
                            <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'>Rasmi</th>
                            <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'>Nomi</th>
                            <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'>Narxi</th>
                            <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'>O'zgartirish</th>
                        </tr>
                    </thead>
                    <tbody className='bg-white divide-y divide-gray-200 '>
                        {blog.map((data) => (
                            <tr key={data.id}>
                                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                                    <img src={data.img} alt={data.title} className='w-24 h-16 object-cover rounded-md' />
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>{data.title}</td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{data.descript}</td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium flex space-x-4'>
                                    <button 
                                        onClick={() => handleEdit(data.id, data.title, data.descript, data.img)} 
                                        className='text-blue-600 hover:text-blue-800'
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(data.id)} 
                                        className='text-red-600 hover:text-red-800'
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dashboard;
