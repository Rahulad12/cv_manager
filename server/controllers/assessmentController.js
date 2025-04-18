import Assessment from "../model/Assessment.js";
import AssessmentAssignment from "../model/AssessmentAssignment.js";
const createAssessment = async (req, res) => {
    const { title, type, technology, level } = req.body
    try {
        const createdAssessment = await Assessment.create({ title, type, technology, level });
        if (!createdAssessment) {
            return res.status(400).json({ success: false, message: "Assessment not created" });
        }

        return res.status(200).json({ success: true, message: "Assessment created successfully", data: createdAssessment });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

const assignAssessment = async (req, res) => {
    let { candidate, assessment } = req.body

    if (!Array.isArray(candidate)) {
        candidate = [candidate];
    }
    try {
        const existingAssignment = await AssessmentAssignment.find({ candidate: { $in: candidate }, assessment });

        if (existingAssignment.length > 0) {
            return res.status(400).json({ success: false, message: "Assessment already assigned" });
        }

        const assignments = await Promise.all(
            candidate.map(async (candidateId) => {
                return await AssessmentAssignment.create({
                    candidate: candidateId,
                    assessment
                });
            })
        )

        return res.status(200).json({ success: true, message: "Assessment Assigned successfully", data: assignments });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

const getAssessment = async (req, res) => {
    try {
        const assessment = await Assessment.find({}).select("-createdAt -updatedAt -__v");
        if (assessment.length === 0) {
            return res.status(404).json({ success: false, message: "No assessment found" });
        }
        return res.status(200).json({ success: true, message: "Assessment fetched successfully", data: assessment });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

const getAssignment = async (req, res) => {
    try {
        const assignment = await AssessmentAssignment.find({}).select("-createdAt -updatedAt -__v").populate({
            path: "candidate",
            select: "-createdAt -updatedAt -__v"
        }).populate({
            path: "assessment",
            select: "-createdAt -updatedAt -__v"
        });
        if (assignment.length === 0) {
            return res.status(404).json({ success: false, message: "No assignment found" });
        }
        return res.status(200).json({ success: true, message: "Assignment fetched successfully", data: assignment });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

const deleteAssessment = async (req, res) => {
    try {
        const assessment = await Assessment.findByIdAndDelete(req.params.id);
        if (!assessment) {
            return res.status(404).json({ success: false, message: "Assessment not found" });
        }
        return res.status(200).json({ success: true, message: "Assessment deleted successfully", data: assessment });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

const deleteAssignment = async (req, res) => {
    try {
        const assignment = await AssessmentAssignment.findByIdAndDelete(req.params.id);
        if (!assignment) {
            return res.status(404).json({ success: false, message: "Assignment not found" });
        }
        return res.status(200).json({ success: true, message: "Assignment deleted successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};


export { createAssessment, assignAssessment, getAssessment, getAssignment, deleteAssessment, deleteAssignment }