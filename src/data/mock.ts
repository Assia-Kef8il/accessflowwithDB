export type Employee = {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  phone: string;
  matricule: string;
  permis: string;
  hireDate: string;
  category: string;
  permanent: boolean;
  department: string;
};

export const wilayas = [
  "Alger", "Oran", "Constantine", "Annaba", "Tlemcen", "Sétif", "Batna",
  "Béjaïa", "Blida", "Tizi Ouzou", "Ghardaïa", "Tamanrasset", "Adrar", "Mostaganem",
];

export const departments = ["Administration", "Sécurité", "IT", "Ressources Humaines", "Finance", "Logistique"];
export const categories = ["Cadre", "Maîtrise", "Exécution", "Stagiaire"];

export const initialEmployees: Employee[] = [
  { id: "1", nom: "Benali", prenom: "Ahmed", email: "ahmed.benali@sdm.dz", phone: "0551234567", matricule: "MAT001", permis: "B", hireDate: "12/03/2018", category: "Cadre", permanent: true, department: "IT" },
  { id: "2", nom: "Boudiaf", prenom: "Yacine", email: "yacine.boudiaf@sdm.dz", phone: "0661112233", matricule: "MAT002", permis: "B", hireDate: "05/09/2019", category: "Maîtrise", permanent: true, department: "Sécurité" },
  { id: "3", nom: "Hamidi", prenom: "Sara", email: "sara.hamidi@sdm.dz", phone: "0771445566", matricule: "MAT003", permis: "B", hireDate: "21/06/2020", category: "Cadre", permanent: true, department: "Ressources Humaines" },
  { id: "4", nom: "Cherif", prenom: "Amina", email: "amina.cherif@sdm.dz", phone: "0540998877", matricule: "MAT004", permis: "—", hireDate: "14/01/2021", category: "Maîtrise", permanent: false, department: "Finance" },
  { id: "5", nom: "Mansouri", prenom: "Karim", email: "karim.mansouri@sdm.dz", phone: "0699887766", matricule: "MAT005", permis: "B", hireDate: "30/11/2017", category: "Cadre", permanent: true, department: "Administration" },
  { id: "6", nom: "Khelifi", prenom: "Lina", email: "lina.khelifi@sdm.dz", phone: "0560554433", matricule: "MAT006", permis: "—", hireDate: "08/04/2022", category: "Exécution", permanent: false, department: "Logistique" },
  { id: "7", nom: "Saadi", prenom: "Walid", email: "walid.saadi@sdm.dz", phone: "0775443322", matricule: "MAT007", permis: "B", hireDate: "17/07/2016", category: "Cadre", permanent: true, department: "IT" },
  { id: "8", nom: "Belkacem", prenom: "Nadia", email: "nadia.belkacem@sdm.dz", phone: "0551122334", matricule: "MAT008", permis: "B", hireDate: "02/12/2019", category: "Maîtrise", permanent: true, department: "Sécurité" },
];

export const leaves = [
  { id: "1", employee: "Ahmed Benali", type: "Congé annuel", start: "10/05/2025", end: "20/05/2025", days: 10, status: "approved" },
  { id: "2", employee: "Sara Hamidi", type: "Congé maladie", start: "03/06/2025", end: "05/06/2025", days: 3, status: "approved" },
  { id: "3", employee: "Karim Mansouri", type: "Congé annuel", start: "15/07/2025", end: "30/07/2025", days: 15, status: "pending" },
  { id: "4", employee: "Lina Khelifi", type: "Congé sans solde", start: "01/08/2025", end: "10/08/2025", days: 10, status: "rejected" },
  { id: "5", employee: "Yacine Boudiaf", type: "Congé annuel", start: "12/09/2025", end: "22/09/2025", days: 10, status: "pending" },
];

export const missions = [
  { id: "1", employee: "Ahmed Benali", mission: "Audit réseau agence", wilaya: "Oran", departure: "05/02/2025", returnDate: "08/02/2025" },
  { id: "2", employee: "Yacine Boudiaf", mission: "Inspection sécurité site", wilaya: "Tlemcen", departure: "11/02/2025", returnDate: "13/02/2025" },
  { id: "3", employee: "Karim Mansouri", mission: "Réunion direction régionale", wilaya: "Constantine", departure: "18/02/2025", returnDate: "20/02/2025" },
  { id: "4", employee: "Sara Hamidi", mission: "Formation RH", wilaya: "Alger", departure: "25/02/2025", returnDate: "27/02/2025" },
  { id: "5", employee: "Walid Saadi", mission: "Installation serveurs", wilaya: "Annaba", departure: "03/03/2025", returnDate: "07/03/2025" },
  { id: "6", employee: "Nadia Belkacem", mission: "Contrôle accès filiale", wilaya: "Béjaïa", departure: "10/03/2025", returnDate: "12/03/2025" },
];

export const presence = [
  { id: "1", employee: "Ahmed Benali", date: "16/04/2026", entry: "08:02", exit: "17:05", status: "present" },
  { id: "2", employee: "Yacine Boudiaf", date: "16/04/2026", entry: "07:55", exit: "16:58", status: "present" },
  { id: "3", employee: "Sara Hamidi", date: "16/04/2026", entry: "—", exit: "—", status: "leave" },
  { id: "4", employee: "Karim Mansouri", date: "16/04/2026", entry: "08:15", exit: "17:20", status: "present" },
  { id: "5", employee: "Amina Cherif", date: "16/04/2026", entry: "08:30", exit: "—", status: "present" },
  { id: "6", employee: "Lina Khelifi", date: "16/04/2026", entry: "—", exit: "—", status: "absent" },
  { id: "7", employee: "Walid Saadi", date: "16/04/2026", entry: "—", exit: "—", status: "mission" },
  { id: "8", employee: "Nadia Belkacem", date: "16/04/2026", entry: "07:48", exit: "17:02", status: "present" },
];

export const accessLogs = [
  { id: "1", employee: "Ahmed Benali", date: "16/04/2026", time: "08:02", door: "Entrée principale", action: "entry" },
  { id: "2", employee: "Yacine Boudiaf", date: "16/04/2026", time: "07:55", door: "Entrée principale", action: "entry" },
  { id: "3", employee: "Karim Mansouri", date: "16/04/2026", time: "08:15", door: "Parking", action: "entry" },
  { id: "4", employee: "Amina Cherif", date: "16/04/2026", time: "08:30", door: "Entrée principale", action: "entry" },
  { id: "5", employee: "Nadia Belkacem", date: "16/04/2026", time: "07:48", door: "Entrée latérale", action: "entry" },
  { id: "6", employee: "Ahmed Benali", date: "15/04/2026", time: "17:05", door: "Entrée principale", action: "exit" },
  { id: "7", employee: "Yacine Boudiaf", date: "15/04/2026", time: "16:58", door: "Entrée principale", action: "exit" },
  { id: "8", employee: "Karim Mansouri", date: "15/04/2026", time: "17:20", door: "Parking", action: "exit" },
  { id: "9", employee: "Nadia Belkacem", date: "15/04/2026", time: "17:02", door: "Entrée latérale", action: "exit" },
  { id: "10", employee: "Sara Hamidi", date: "14/04/2026", time: "08:10", door: "Entrée principale", action: "entry" },
];

export const badges = [
  { id: "1", badgeId: "BDG-0001", employee: "Ahmed Benali", department: "IT", issued: "12/03/2018", status: "active" },
  { id: "2", badgeId: "BDG-0002", employee: "Yacine Boudiaf", department: "Sécurité", issued: "05/09/2019", status: "active" },
  { id: "3", badgeId: "BDG-0003", employee: "Sara Hamidi", department: "Ressources Humaines", issued: "21/06/2020", status: "active" },
  { id: "4", badgeId: "BDG-0004", employee: "Amina Cherif", department: "Finance", issued: "14/01/2021", status: "active" },
  { id: "5", badgeId: "BDG-0005", employee: "Karim Mansouri", department: "Administration", issued: "30/11/2017", status: "active" },
  { id: "6", badgeId: "BDG-0006", employee: "Lina Khelifi", department: "Logistique", issued: "08/04/2022", status: "inactive" },
  { id: "7", badgeId: "BDG-0007", employee: "Walid Saadi", department: "IT", issued: "17/07/2016", status: "active" },
  { id: "8", badgeId: "BDG-0008", employee: "Nadia Belkacem", department: "Sécurité", issued: "02/12/2019", status: "active" },
];
