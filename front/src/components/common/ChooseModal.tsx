import { FC } from "react";

import { QuestionMarkCircleIcon } from '@heroicons/react/24/solid';

interface ChooseModalProps {
    show: boolean;
    onChoose: () => void;
    onCancel: () => void;
}

const ChooseModal: FC<ChooseModalProps> = ({ show, onChoose, onCancel }) => (
    <div className={`fixed top-0 bottom-0 left-0 right-0 bg-black/30${show ? '' : ' hidden'}`}
        onClick={e => e.target === e.currentTarget && onCancel()}>
        <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-96 bg-white rounded-sm">
            <div className="py-10 text-xl text-center font-semibold">
                <QuestionMarkCircleIcon className="inline-block w-12 mr-2"/>
                <span>Are you sure?</span>
            </div>
            <div className="flex">
                <button className="flex-1 py-3 text-white font-semibold rounded-bl-sm bg-black transition-all 
                    active:bg-zinc-800
                    disabled:bg-zinc-600 disabled:active:bg-zinc-600"
                    onClick={() => onChoose()}>YES</button>
                <button className="flex-1 py-3 rounded-br-sm transition-all
                    active:bg-gray-100
                    disabled:text-gray-400 disabled:active:bg-white"
                    onClick={() => onCancel()}>NO</button>
            </div>
        </div>
    </div>
);

export default ChooseModal;