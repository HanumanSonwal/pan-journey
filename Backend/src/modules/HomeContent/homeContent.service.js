import HomeContent from "./homeContent.model.js";


// CREATE

export const createHomeContent = async (data) => {

    // only one banner allowed
    if (data.sectionType === "banner") {

        const existingBanner = await HomeContent.findOne({
            sectionType: "banner"
        });


        if (existingBanner) {
            throw new Error(
                "Banner already exists. Please update existing banner."
            );
        }
    }


    const content = await HomeContent.create(data);

    return content;
};


// GET FOR WEBSITE

export const getHomeContent = async()=>{


    const data = await HomeContent.find({
        isActive:true
    })
    .sort({
        order:1
    });


    const response={

        banner:[],
        placesAsPerYourVibe:[],
        topRatedHotels:[],
        popularDestinations:[]

    };


    data.forEach(item=>{


        switch(item.sectionType){


            case "banner":
                response.banner.push(item);
                break;


            case "vibe":
                response.placesAsPerYourVibe.push(item);
                break;


            case "topRatedHotels":
                response.topRatedHotels.push(item);
                break;


            case "popularDestinations":
                response.popularDestinations.push(item);
                break;

        }

    });


    return response;

};



// UPDATE


export const updateHomeContent = async(
    id,
    data
)=>{

    return await HomeContent.findByIdAndUpdate(
        id,
        data,
        {
            new:true
        }
    );

};

export const getAdminHomeContent = async () => {

    const data = await HomeContent.find()
        .sort({
            order: 1
        });

    return data;

};


// DELETE

export const deleteHomeContent = async(id)=>{


    return await HomeContent.findByIdAndUpdate(
        id,
        {
            isActive:false
        },
        {
            new:true
        }
    );

};