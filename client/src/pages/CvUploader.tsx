import { useEffect, useState } from "react";
import { Modal, Card } from "antd";
import { UserPlus } from "lucide-react";
import CandidateForm from "../component/Form/CandidateForm";
import { useCreateCandidateMutation, useGetCandidateQuery } from "../services/candidateServiceApi";
import { useAppDispatch, useAppSelector } from "../Hooks/hook";
import { storeCandidate } from "../action/SoreCandidate";
import CandidateTable from "../component/common/CandidateTable";
import TableSearch from "../component/common/TableSearch";

const CvUploader = () => {
    console.log("cv uploader");
    const filters = useAppSelector((state) => state.search);
    const { isLoading, data: candidate, isError, refetch } = useGetCandidateQuery({
        name: filters.name,
        technology: filters.technology,
        status: filters.status,
        level: filters.level
    });
    const dispatch = useAppDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => setIsModalOpen(true);
    const handleCancel = () => setIsModalOpen(false);

    useEffect(() => {
        if (candidate?.data) {
            dispatch(storeCandidate(candidate.data));
            refetch();
        }
        console.log("cv uploader useEffect re render");
        return () => {
            dispatch(storeCandidate([]));
        };
    }, [candidate, dispatch, refetch]);

    return (
        <div className=" space-y-4">

            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Candidates</h1>
                <button
                    className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium py-2 px-4 rounded-md cursor-pointer"
                    onClick={showModal}
                >
                    <UserPlus className="w-4 h-4" /> Add Candidate
                </button>
            </div>

            <Card className="overflow-x-auto bg-white rounded shadow">
                <div className="space-y-4">
                    <TableSearch />
                    <CandidateTable loading={isLoading} error={isError} />
                </div>
            </Card>

            <Modal
                open={isModalOpen}
                onCancel={handleCancel}
                footer={null}
                width={800}
                centered
                destroyOnClose
            >
                <CandidateForm />
            </Modal>
        </div>
    );
};

export default CvUploader;
