import React, { useState, createContext, useContext, useCallback } from "react";
import * as Toast from "@radix-ui/react-toast";


const ToastContext = createContext();


export const ToastProvider = ({ children }) => {

	console.log(children);
	const [open, setOpen] = useState(false);

	const [toastMessage, setToastMessage] = useState({
		title: "",
		description: "",
	  });


	const showToast = useCallback(({ title, description }) => {
		console.log(`title: ${title}`);
		setToastMessage({ title, description });
		setOpen(true);
	  }, []);

	return(

		<ToastContext.Provider value={{ showToast }}>
		{children}
			<Toast.Provider swipeDirection="right" >

				<Toast.Root
					open={open}	
					onOpenChange={setOpen}
					duration={5000}
					className="bg-gray-800 text-white rounded p-4"
				>
					<Toast.Title className="font-bold">Notification: {toastMessage.title} </Toast.Title>
					<Toast.Description className="text.sm">
						A radix toast Notification.<br>
						{toastMessage.description}
					</Toast.Description>
					{/* <Toast.Action />
					<Toast.Close /> */}
				</Toast.Root>

				<Toast.Viewport className="fixed bottom-0 right-0 m-4 flex flex-col gap-2" />
			</Toast.Provider>
		</ToastContext.Provider>
	);
};



export const useToast = () => useContext(ToastContext);