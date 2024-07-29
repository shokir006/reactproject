import { addDoc, collection, deleteDoc, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { notification } from 'antd';

const Blog = () => {
    const [blog, setBlog] = useState([]);
    const [title, setTitle] = useState('');
    const [descript, setDescript] = useState('');
    const [img, setImg] = useState('');
    const [show, setShow] = useState(true);
    const [id, setId] = useState('');

    let data = collection(db, 'blogs');

    useEffect(() => {
        const unsubscribe = onSnapshot(data, (snapshot) => {
            let malumot = [];
            snapshot.docs.forEach((doc) => {
                malumot.push({ ...doc.data(), id: doc.id });
            });
            setBlog(malumot);
        });
        return () => unsubscribe();
    }, []);

    const database = collection(db, 'blogs');

    const handleCreate = async (e) => {
        if (title === "" || descript === "" || img === "") {
            return notification.error({
                message: "Input bo'sh",
                description: "Iltimos malumotlarni to'liq kiriting"
            });
        } else {
            e.preventDefault();
            await addDoc(database, {
                title: title,
                descript: descript,
                img: img,
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
        const deletePost = doc(db, 'blogs', id);
        await deleteDoc(deletePost);
    };

    const handleEdit = (id, title, descript, img) => {
        setId(id);
        setTitle(title);
        setDescript(descript);
        setImg(img);
        setShow(false);
    };

    const handleUpdate = async () => {
        const updateData = doc(db, 'blogs', id);
        await updateDoc(updateData, { title, descript, img });
        setShow(true);
        setId('');
        setTitle('');
        setDescript('');
        setImg('');
    };

    return (
        <div>
            <h2>Blogs</h2>

            <div>
                <label>
                    <span>Title</span>
                    <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" className='border border-black mx-2' />
                </label>
                <label>
                    <span>Description</span>
                    <input value={descript} onChange={(e) => setDescript(e.target.value)} type="text" className='border border-black mx-2' />
                </label>
                <label>
                    <span>Img</span>
                    <input value={img} onChange={(e) => setImg(e.target.value)} type="text" className='border border-black mx-2' />
                </label>
            </div>

            {show ? (
                <button className='border px-4 py-2 mt-2 bg-blue-600' onClick={handleCreate}>Create</button>
            ) : (
                <button className='border px-4 py-2 mt-2 bg-blue-600' onClick={handleUpdate}>Update</button>
            )}

            <table className="min-w-full divide-y divide-gray-200 mt-4">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rasmi</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {blog.map((data) => (
                        <tr key={data.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{data.title}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.descript}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <img src={data.img} alt={data.title} className="w-32 h-16 object-cover" />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <button onClick={() => handleEdit(data.id, data.title, data.descript, data.img)} className="text-blue-600 hover:text-blue-900">Edit</button>
                                <button onClick={() => handleDelete(data.id)} className="ml-4 text-red-600 hover:text-red-900">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Blog;
