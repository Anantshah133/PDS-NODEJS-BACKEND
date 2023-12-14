const TeamMember = require("../models/TeamMember");
const {deleteFile} = require("../utils/deleteFile");

const createTeamMember = async (req, res) => {
    try {
        const {name, designation} = req.body;

        const teamMember = await TeamMember.create({
            name,
            designation,
            image: req.file?.filename ?? undefined,
        });

        return res.status(200).json({
            success: true,
            data: teamMember,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            error: error?.message ?? "some thing went wrong",
        });
    }
};

const getAllTeamMember = async (req, res) => {
    try {
        const {id} = req?.query;

        const filterQuery = {};
        if (id) filterQuery._id = id;
        const teamMember = await TeamMember.find(filterQuery).sort({createdAt: -1});

        return res.status(200).json({
            success: true,
            count: teamMember.length,
            data: teamMember,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            error: error?.message ?? "some thing went wrong",
        });
    }
};

const updateTeamMember = async (req, res) => {
    try {
        const {teamMemberId} = req.params;
        const {name, designation} = req.body;
        await TeamMember.findByIdAndUpdate(teamMemberId, {
            name,
            designation,
            image: req.file?.filename ?? undefined,
        });
        return res.status(200).json({
            success: true,
            message: "Team Member updated successfully",
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            error: error?.message ?? "some thing went wrong",
        });
    }
}

const deleteTeamMember = async (req, res) => {
    try {
        const {teamMemberId} = req.params;

        const teamMember = await TeamMember.findOne({_id: teamMemberId});

        if (!teamMember) {
            return res.status(400).json({
                success: false,
                message: "team member not found",
            });
        }

        deleteFile(teamMember.image);

        await TeamMember.findByIdAndDelete(teamMemberId);

        return res.status(200).json({
            success: true,
            message: "Team Member deleted successfully",
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            error: error?.message ?? "some thing went wrong",
        });
    }
};

module.exports = {
    createTeamMember,
    getAllTeamMember,
    updateTeamMember,
    deleteTeamMember,
};
