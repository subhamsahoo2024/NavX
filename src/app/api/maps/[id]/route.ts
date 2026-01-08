import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import type { MapData } from "@/types/navigation";

interface RouteParams {
  params: Promise<{ id: string }>;
}

/**
 * GET /api/maps/[id]
 * Returns the FULL map document (nodes, edges, everything)
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const mapsCollection = db.collection("maps");

    // First try to find by custom id field
    const snapshot = await mapsCollection.where("id", "==", id).get();

    if (!snapshot.empty) {
      const doc = snapshot.docs[0];
      const data = doc.data();
      return NextResponse.json({
        success: true,
        data: { ...data, id: data.id || doc.id },
      });
    }

    // Fallback: try to find by document ID
    const docRef = mapsCollection.doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return NextResponse.json(
        {
          success: false,
          error: `Map '${id}' not found`,
        },
        { status: 404 }
      );
    }

    const data = doc.data();

    return NextResponse.json({
      success: true,
      data: { ...data, id: data.id || doc.id },
    });
  } catch (error) {
    console.error(`GET /api/maps/[id] error:`, error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to fetch map",
      },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/maps/[id]
 * Update a map (full replacement)
 * Input: Full MapData object
 */
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body: Partial<MapData> = await request.json();

    const mapsCollection = db.collection("maps");

    // First try to find by custom id field
    const snapshot = await mapsCollection.where("id", "==", id).get();
    let docRef;

    if (!snapshot.empty) {
      docRef = snapshot.docs[0].ref;
    } else {
      // Fallback: try to find by document ID
      docRef = mapsCollection.doc(id);
      const doc = await docRef.get();

      if (!doc.exists) {
        return NextResponse.json(
          {
            success: false,
            error: `Map '${id}' not found`,
          },
          { status: 404 }
        );
      }
    }

    // Prepare update data
    const updateData: any = {
      updatedAt: new Date(),
    };

    if (body.name !== undefined) updateData.name = body.name;
    if (body.imageUrl !== undefined) updateData.imageUrl = body.imageUrl;
    if (body.nodes !== undefined) updateData.nodes = body.nodes;
    if (body.adjacencyList !== undefined)
      updateData.adjacencyList = body.adjacencyList;

    // Update the document
    await docRef.update(updateData);

    // Fetch and return updated document
    const updatedDoc = await docRef.get();
    const updatedData = updatedDoc.data();

    return NextResponse.json({
      success: true,
      data: { ...updatedData, id: updatedData?.id || updatedDoc.id },
    });
  } catch (error) {
    console.error(`PUT /api/maps/[id] error:`, error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to update map",
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/maps/[id]
 * Delete a map
 */
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const mapsCollection = db.collection("maps");

    // First try to find by custom id field
    const snapshot = await mapsCollection.where("id", "==", id).get();
    let docRef;

    if (!snapshot.empty) {
      docRef = snapshot.docs[0].ref;
    } else {
      // Fallback: try to find by document ID
      docRef = mapsCollection.doc(id);
      const doc = await docRef.get();

      if (!doc.exists) {
        return NextResponse.json(
          {
            success: false,
            error: `Map '${id}' not found`,
          },
          { status: 404 }
        );
      }
    }

    // Delete the document
    await docRef.delete();

    return NextResponse.json({
      success: true,
      message: `Map '${id}' deleted successfully`,
    });
  } catch (error) {
    console.error(`DELETE /api/maps/[id] error:`, error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to delete map",
      },
      { status: 500 }
    );
  }
}
