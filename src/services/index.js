import { db } from "../firebase/firebase";
import {
    addDoc, 
    collection, 
    FieldValue, 
    updateDoc, 
    doc, 
    getDoc, 
    getDocs, 
    query, 
    where, 
    deleteDoc } from "firebase/firestore";
import { async } from "@firebase/util";

const userRef = (doc_id) => {
    if(doc_id) 
        return doc(db, "users",doc_id);
    return collection(db, "users")
}
const notebookRef = (doc_id) => {
    if(doc_id) 
        return doc(db, "notebooks",doc_id);
    return collection(db, "notebooks")
}
export const noteRef = (doc_id) => {
    if(doc_id) 
        return doc(db, "notes",doc_id);
    return collection(db, "notes")
}

const haveSameData = function (obj1, obj2) {
    const obj1Length = Object.keys(obj1).length;
    const obj2Length = Object.keys(obj2).length;

    if (obj1Length === obj2Length) {
        return Object.keys(obj1).every(
            key => obj2.hasOwnProperty(key)
                && obj2[key] === obj1[key]);
    }
    return false;
}

export const Service = {
    getSingleNote: async(doc_id) => {
        const docRef = noteRef(doc_id);
        const res = await getDoc(docRef);
        
        if(!res.exists())
        return new Error("Note does not exist");

        return {id: res.id, ...res.data()};
    },
    getSingleNotebook: async(doc_id) => {
        const docRef = notebookRef(doc_id);
        const res = (await getDoc(docRef));
    
        if(!res.exists())
        return new Error("Notebook does not exist");
        
        let { notes, ...bookObj } = res.data();

        const list = await Promise.all(notes.map(async(id) => {
            const re = await Service.getSingleNote(id);
            return re;
        }))

        return {...bookObj, id:doc_id, notes:list};
    },
    getFullUserData: async(email) => {
        const q = query(userRef(), where("email", "==", email));
        
        const querySnapshot = await getDocs(q);
        let result = [];
        querySnapshot.forEach(doc => result.push(doc.data()));

        const {notebooks, ...user} = result[0];

        const notebook_list = await Promise.all(notebooks.map(async(id) => {
            const re = await Service.getSingleNotebook(id);
            return re;
        }))
        return ({...user,notebooks:notebook_list});
    },
    getUserNotebookData: async() => {

    },
    addNotebook: async(user_id, notebook_name) => {
        const userDocRef = userRef(user_id);
        const notebookDocRef = await addDoc(notebookRef(), {title:notebook_name, notes:[]});

        const userDoc = await getDoc(userDocRef);
        
        const {notebooks} = userDoc.data();

        notebooks.push(notebookDocRef.id)

        await updateDoc(userDocRef,{
            notebooks: notebooks
        })

        return "Added Notebook Successfully";
    },
    addNote:async(notebook_id, note_data)=> {
        console.log(note_data);

        if(Object.keys(note_data).length === 0 || !notebook_id) 
            return "Pass all the parameters";
        const notebookDocRef = notebookRef(notebook_id);
        const noteDocRef = await addDoc(noteRef(), note_data);

        const notebookDoc = await getDoc(notebookDocRef);
        
        const {notes} = notebookDoc.data();

        notes.push(noteDocRef.id)
        console.log(notes);
        await updateDoc(notebookDocRef,{
            notes: notes
        })
        console.log(noteDocRef.data());
        return {id: noteDocRef.id, ...noteDocRef.data()};
    },
    deleteNotebook:async(doc_id) => {
        const notebookDoc = notebookRef(doc_id);
        await deleteDoc(notebookDoc);
    },
    addNotePoint: async(note_id, notePoint) => {
        if(!notePoint.text || !notePoint.time)
            return new Error("Pass text and time both");
        
        const noteDoc = await getDoc(noteRef(note_id));
        
        
        const {points = []} = noteDoc.data();

        points.push(notePoint);

        await updateDoc(noteRef(note_id),{
            points: points
        })

        return "Added Note Point";
    },
    deleteNotePoint: async(note_id, notePoint) => {
        if(!notePoint.text || !notePoint.time)
            return new Error("Pass text and time both");
        
        const noteDoc = await getDoc(noteRef(note_id));
        
        const {points = []} = noteDoc.data();

        const newPoints = points.filter(point => {
            return !haveSameData(point, notePoint);
        });

        await updateDoc(noteRef(note_id),{
            points: newPoints
        })
        return "Deleted Note Point";
    },
    checkNoteExists:async(url) => {
        const q = query(noteRef(), where("videoURL", "==", url));
        const querySnapshot = await getDocs(q);
        let result = [];
        querySnapshot.forEach(doc => result.push({id:doc.id,...doc.data()}));

        if(result.length === 0)
            return null;
        return result[0];
    }
}