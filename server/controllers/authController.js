const AuthService = require('../services/authService');

exports.register = async (req, res) => {
  try {
    const user = await AuthService.register(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const result = await AuthService.login(username, password);
    res.status(200).json(result);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports. logout=async(req, res)=> {
  try {
    console.log("before ----------- ");
    console.log(req);
    await req.logout((err)=>{
      if (err) console.log("Error"+ err);
    });
    console.log("after ----------- ");
    console.log(req);
    
    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    next(error);
  }
}
