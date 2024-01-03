const { Op } = require("sequelize")
const Note = require("../schemas/note.schema")
const User = require("../schemas/user.schema")

const getNotes = async (req, res) => {
    try {
        const createNote = await Note.findAll({
            attributes: ['id', 'Note', 'createdAt'],
            order: [['createdAt', 'DESC']],
            include: [
                {
                    model: User,
                    attributes: ['id', 'first_name', 'last_name', 'email', 'createdAt']
                }
            ]
        })

        return res.status(200).json({ success: true, data: createNote })

    } catch (error) {
        return res.status(500).json({ success: false, error: error.message })
    }
}

const getNoteById = async (req, res) => {
    try {

        const id = req.params.id

        if (!id) {
            return res.status(500).json({ success: false, message: 'note ID required fields!' })
        }

        const createNote = await Note.findOne({
            where: { id: id },
            attributes: ['id', 'Note', 'createdAt'],
            order: [['createdAt', 'DESC']],
            include: [
                {
                    model: User,
                    attributes: ['id', 'first_name', 'last_name', 'email', 'createdAt']
                }
            ]
        })

        return res.status(200).json({ success: true, data: createNote })

    } catch (error) {
        return res.status(500).json({ success: false, error: error.message })
    }
}

const createNote = async (req, res) => {
    try {
        const { user_id, note } = req.body

        if (!user_id || !note) {
            return res.status(500).json({ success: false, message: 'fill all required fields!' })
        }

        const createNote = await Note.create(
            {
                user_id,
                note
            }
        )

        return res.status(201).json({ success: true, message: 'Note Created Successfully!', data: createNote })

    } catch (error) {
        return res.status(500).json({ success: false, error: error.message })
    }
}

const updateNote = async (req, res) => {
    try {
        const id = req.params.id
        const { note } = req.body

        if (!id) {
            return res.status(500).json({ success: false, message: 'note ID required fields!' })
        }
        if (!note) {
            return res.status(500).json({ success: false, message: 'note is required fields!' })
        }

        const updateNote = await Note.update(
            {
                note
            },
            { where: { id: id } }
        )

        return res.status(201).json({ success: true, message: 'Note Updated Successfully!', data: updateNote })

    } catch (error) {
        return res.status(500).json({ success: false, error: error.message })
    }
}

const deleteNote = async (req, res) => {
    try {
        const id = req.params.id

        if (!id) {
            return res.status(500).json({ success: false, message: 'note ID required fields!' })
        }

        const deleteNote = await Note.destroy(
            { where: { id: id } }
        )

        return res.status(200).json({ success: true, message: 'Note Deleted Successfully!', data: deleteNote })

    } catch (error) {
        return res.status(500).json({ success: false, error: error.message })
    }
}

const shareNote = async (req, res) => {
    try {
        const noteId = req.params.id;
        const { user_id } = req.body;

        const note = await Note.findByPk(noteId);

        if (!note) {
            return res.status(404).json({ error: 'Note not found' });
        }

        const userToShareWith = await User.findByPk(user_id);

        if (!userToShareWith) {
            return res.status(404).json({ error: 'User to share with not found' });
        }

        await note.setUser(userToShareWith);

        return res.status(200).json({ success: true, message: 'Note shared successfully!' })

    } catch (error) {
        return res.status(500).json({ success: false, error: error.message })
    }
}

const searchNote = async (req, res) => {
    try {
        const query = req.query.q;
        if (!query) {
            return res.status(500).json({ success: false, message: 'query is required!' })
        }
        const results = await Note.findAll({
            where: {
                note: {
                    [Op.like]: `%${query}%`,
                },
            },
        });
        return res.status(200).json({ success: true, data: results })

    } catch (error) {
        return res.status(500).json({ success: false, error: error.message })
    }
}




module.exports = { getNotes, getNoteById, createNote, updateNote, deleteNote, shareNote, searchNote }