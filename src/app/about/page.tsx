const About = () => {
  return (
    <div className="min-h-screen p-3 bg-ow-dark-blue text-white rounded-sm shadow-lg">
      <div className="flex-1 flex items-top justify-center pt-3 pb-6">
        <h1 className="text-2xl font-black uppercase underline decoration-4">About The Team</h1>
      </div>

      <div className="flex flex-col md:flex-row pb-10">
        <div className="flex-2 flex items-center justify-start pl-5 tracking-wider">
          <p className="font-semibold text-lg leading-relaxed">
            We are a team of five undergraduate students who wanted to make a
            website which would allow Overwatch fans to test their knowledge of
            Overwatch in the form of a quiz game. The main purpose is to allow 
            Overwatch gamers connect with the game more and show off their knowledge.
            This project was intialized, planned, and executed within
            a ten week period, primarily using the React library. If you have
            any questions or comments, please contact us with the information given below.
          </p>
        </div>
        <div className="flex-1 flex items-center justify-end pr-4 pb-10">
          <img src="https://www.freepnglogos.com/uploads/overwatch---------------------------tokyo--30.png" />
        </div>
      </div>
      <div className="flex flex-row md:flex-col bg-gray-900 pt-3 pb-6 rounded-sm items-center justify-center">
        <div className="flex flex-1 items-center justify-center pb-3">
          <h2 className="font-black text-s text-orange-300">
            Contact Information
          </h2>
        </div>
        <p className="font-black text-l px-3">
          aassad1@uci.edu • carsonmd@uci.edu • jasonbm2@uci.edu •
          namclaug@uci.edu • tapiarr@uci.edu
        </p>
      </div>
    </div>
  );
};

export default About;
