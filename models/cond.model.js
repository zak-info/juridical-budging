const mongoose = require('mongoose');

const CondSchema = new mongoose.Schema({
    status: String,
    serial: String,
    sid: String,
    uuid: String,
    token: String,
    uri: String,
    created: String,
    completed: String,
    changed: String,
    in_draft: String,
    current_page: String,
    remote_addr: String,
    uid: String,
    langcode: String,
    webform_id: String,
    entity_type: String,
    entity_id: String,
    locked: String,
    sticky: String,
    notes: String,
    data: {
        choix_du_pack: [String],
        categories: String,
        code_promo: String,
        email: String,
        ndeg_telephone: String,
        nom: String,
        packs: String,
        pays: String,
        prenom: String,
        terms_of_service: String,
        ville: String
    }
});
const Cond = mongoose.models.Cond || mongoose.model("Cond", CondSchema);

export default Cond;