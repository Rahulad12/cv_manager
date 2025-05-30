import { Button, Card } from 'antd'
import { Calendar, FileCheck, FileText, Mail, Ban } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
interface Props {
    rejectCandidateHandlers?: () => void
    disableRejectionButton?: boolean
}
const CandidateQuickAction: React.FC<Props> = ({
    rejectCandidateHandlers,
    disableRejectionButton
}) => {
    const navigate = useNavigate();
    const { id } = useParams<string>();

    return (
        <Card title="Quick Actions" className="mb-6">
            <div className="space-y-3">
                <Button block icon={<FileCheck size={16} />} className="flex items-center justify-center" onClick={() => navigate('/dashboard/assessments/assign')}>
                    Assign Assessment
                </Button>
                <Button type="primary" block icon={<Calendar size={16} />} className="flex items-center justify-center" onClick={() => navigate('/dashboard/interviews/schedule')}>
                    Schedule Interview
                </Button>
                <Button block icon={<FileText size={16} />} className="flex items-center justify-center" onClick={() => navigate('/dashboard/offers/new')}>
                    Create Offer Letter
                </Button>
                <Button block icon={<Mail size={16} />} className="flex items-center justify-center" onClick={() => navigate(`/dashboard/candidates/email/${id}`)}>
                    Send Email
                </Button>

                <Button danger block icon={<Ban size={16} />} className="flex items-center justify-center" onClick={rejectCandidateHandlers} disabled={disableRejectionButton}>
                    Reject Candidate
                </Button>
            </div>
        </Card>
    )
}

export default CandidateQuickAction
