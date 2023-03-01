read -p "Enter the Starter Space ID " starterSpaceId 

read -p "Have you created New Contentful Organization and saved Space ID in the .env.local (y/n)? " answer
case ${answer:0:1} in
    y|Y )
        echo Y
    ;;
    * )
        echo N
        echo "Please do it and restart"
        exit
    ;;
esac

echo "Installing Contentful CLI"
npm i -g contentful-cli
contentful login

read -p "Do you want to logout(y) or continue with loggin user(n)? " answer
case ${answer:0:1} in
    y|Y )
        echo Y
        contentful logout
        contentful login
    ;;
    * )
        echo N
    ;;
esac

echo "Downloading Contentful Starter Space ID" $starterSpaceId
contentful space export --download-assets --content-file  exported-file.json --space-id $starterSpaceId 

echo "Select contentful space Id to migrate from .env.local"
IFS=$'\n'
select choice in $(cat .env.local)
do
    if [[ $choice != "exit" ]]
    then
        echo "your choice was: "$choice
        IFS='='
        read -a strarr <<< "$choice"
        echo "your choice was: "${strarr[1]}  
        # Run your program here
        contentful space import --content-file exported-file.json --space-id ${strarr[1]}  --environment-id master

        read -p "If Export/Import was succesfull remove data (y/n)? " answer
        case ${answer:0:1} in
            y|Y )
                echo Y
                rm -r images.ctfassets.net
                rm exported-file.json
            ;;
            * )
                echo N
            ;;
        esac

        read -p "Remove global Contentful CLI (y/n)? " answer
        case ${answer:0:1} in
            y|Y )
                echo Y
                npm uninstall -g contentful-cli
            ;;
            * )
                echo N
            ;;
        esac

        break
    else
        exit    
    fi
done    

exit