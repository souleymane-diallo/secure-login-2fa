
export default function RegisterForm() {
    return (
        <div className="bg-white p-8 rounded-lg shadow-md min-w-full">
          <h1 className="text-xl font-bold mb-6 text-center text-gray-700">Créer à votre compte</h1>
            <form>
                <div className="flex flex-col gap-2 mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Nom d'utilisateur ou courriel</label>
                    <div>
                    <input type="email" name="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3" />
                    </div>
                </div>
                <div className="flex flex-col gap-2 mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Mot de passe</label>
                    <div>
                    <input type="password" name="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3" />
                    </div>
                </div>
                
                <div className="mt-5 flex justify-center">
                    <button type="submit" className="w-full sm:w-auto bg-blue-600 text-white font-medium rounded-md text-sm px-5 py-2.5 text-center hover:bg-blue-700 focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 block">
                    Enregistrer
                    </button>
                </div>
            </form>
        </div>
    )
    
}
